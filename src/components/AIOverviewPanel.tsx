import type { ReactNode } from 'react';
import type { PC } from '../types/pc';
import { SpatialPanel } from './SpatialPanel';

interface AIOverviewPanelProps {
  pc: PC;
  analysis: string | null;
  isLoading: boolean;
  error: string | null;
  onReanalyze: () => void;
  onDismiss: () => void;
}

function renderAnalysisText(text: string): ReactNode[] {
  return text.split('\n\n').map((block, i) => {
    const t = block.trim();
    if (!t) return null;
    if (t.startsWith('**') && t.endsWith('**')) {
      return <h4 key={i} className="ai-section-heading">{t.replace(/\*\*/g, '')}</h4>;
    }
    return <p key={i} className="ai-section-body">{t}</p>;
  });
}

export function AIOverviewPanel({
  analysis,
  isLoading,
  error,
  onReanalyze,
  onDismiss,
}: AIOverviewPanelProps) {
  return (
    <div className="ai-panel-entrance-wrapper">
      <SpatialPanel
        className="spatial-tile-ai-overview floating-panel"
        layoutTransform="translate(calc(-100% - 20px), -50%)"
        header={
          <div className="panel-header">
            <h2>AI Build Analysis</h2>
            <p className="panel-subtitle">Powered by Claude</p>
          </div>
        }
      >
        {isLoading ? (
          <div className="ai-loading-state">
            <div className="ai-loading-dots">
              <div className="ai-loading-dot" />
              <div className="ai-loading-dot" />
              <div className="ai-loading-dot" />
            </div>
            <span>Analyzing your build…</span>
          </div>
        ) : error ? (
          <>
            <div className="ai-error-state">{error}</div>
            <div className="ai-action-row">
              <button className="ai-reanalyze-btn" onClick={onReanalyze}>
                Try Again
              </button>
              <button className="ai-dismiss-btn" onClick={onDismiss}>
                Close
              </button>
            </div>
          </>
        ) : analysis ? (
          <>
            <div className="ai-analysis-content">
              {renderAnalysisText(analysis)}
            </div>
            <div className="ai-action-row">
              <button className="ai-reanalyze-btn" onClick={onReanalyze}>
                Re-analyze
              </button>
              <button className="ai-dismiss-btn" onClick={onDismiss}>
                Close
              </button>
            </div>
          </>
        ) : null}
      </SpatialPanel>
    </div>
  );
}
