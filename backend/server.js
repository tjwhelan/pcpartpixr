import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { dbRun, dbAll, dbGet } from './database.js';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ===== TASK ROUTES =====

// GET all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await dbAll('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single task by ID
app.get('/api/tasks/:id', async (req, res) => {
  try {
    const task = await dbGet('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const result = await dbRun(
      'INSERT INTO tasks (title, description) VALUES (?, ?)',
      [title, description || null]
    );

    const task = await dbGet('SELECT * FROM tasks WHERE id = ?', [result.id]);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE a task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const taskId = req.params.id;

    // Check if task exists
    const task = await dbGet('SELECT * FROM tasks WHERE id = ?', [taskId]);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Build update query dynamically
    const updates = [];
    const values = [];

    if (title !== undefined) {
      if (title.trim() === '') {
        return res.status(400).json({ error: 'Title cannot be empty' });
      }
      updates.push('title = ?');
      values.push(title);
    }

    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description);
    }

    if (completed !== undefined) {
      updates.push('completed = ?');
      values.push(completed ? 1 : 0);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(taskId);

    await dbRun(
      `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    const updatedTask = await dbGet('SELECT * FROM tasks WHERE id = ?', [taskId]);
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;

    // Check if task exists
    const task = await dbGet('SELECT * FROM tasks WHERE id = ?', [taskId]);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await dbRun('DELETE FROM tasks WHERE id = ?', [taskId]);
    res.json({ message: 'Task deleted successfully', id: taskId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== AI BUILD ANALYSIS ROUTE =====

app.post('/api/analyze-build', async (req, res) => {
  const { build } = req.body;
  const required = ['cpu', 'motherboard', 'gpu', 'ram', 'storage', 'cooler', 'psu', 'case'];
  const missing = required.filter((k) => !build[k]);
  if (missing.length) return res.status(400).json({ error: `Missing: ${missing.join(', ')}` });

  const totalPrice = required.reduce((s, k) => s + build[k].price, 0);
  const buildSummary = required.map((k) => {
    const c = build[k];
    const specs = Object.entries(c.specs).map(([sk, sv]) => `      ${sk}: ${sv}`).join('\n');
    return `${k.toUpperCase()} — ${c.brand} ${c.name} ($${c.price})\n    Specs:\n${specs}`;
  }).join('\n\n');

  const prompt = `You are an expert PC hardware analyst. Analyze this build for compatibility, performance, and value. Keep total response under 350 words.

BUILD (Total: $${totalPrice.toLocaleString()}):
${buildSummary}

Structure your response with these exact headings:

**COMPATIBILITY**
Check CPU socket vs motherboard, RAM type vs motherboard support, PSU wattage vs total TDP, case form factor vs motherboard. Flag any mismatches as critical.

**PERFORMANCE**
Identify build tier (budget/mid/high-end/enthusiast) and any bottlenecks. Best use cases.

**VALUE**
Price-to-performance for this tier. Any overpriced components or obvious upgrade paths.

**VERDICT**
One sentence: rate Good / Decent / Needs Work and why.`;

  try {
    const msg = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }],
    });
    const analysis = msg.content[0].type === 'text' ? msg.content[0].text : 'Analysis unavailable.';
    res.json({ analysis });
  } catch (err) {
    console.error('AI analysis error:', err);
    res.status(500).json({ error: 'Failed to generate build analysis' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Task tracking server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
