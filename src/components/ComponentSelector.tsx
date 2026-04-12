import type { PCComponent } from '../types/pc';

interface ComponentSelectorProps {
  category: string;
  components: PCComponent[];
  selectedComponent?: PCComponent;
  onSelectComponent: (component: PCComponent) => void;
}

export function ComponentSelector({
  components,
  selectedComponent,
  onSelectComponent,
}: ComponentSelectorProps) {
  return (
    <div className="component-list">
      {components.map((component) => (
        <button
          key={component.id}
          className={`component-card surface-card ${selectedComponent?.id === component.id ? 'selected' : ''}`}
          onClick={() => onSelectComponent(component)}
          enable-xr
        >
          <div className="component-header">
            <h4>{component.name}</h4>
            <span className="brand-badge">{component.brand}</span>
          </div>

          <div className="component-specs">
            {Object.entries(component.specs).slice(0, 3).map(([key, value]) => (
              <div key={key} className="spec-row">
                <span className="spec-label">{key}</span>
                <span className="spec-value">{value}</span>
              </div>
            ))}
          </div>

          <div className="component-price">
            <strong>${component.price.toLocaleString()}</strong>
          </div>
        </button>
      ))}
    </div>
  );
}
