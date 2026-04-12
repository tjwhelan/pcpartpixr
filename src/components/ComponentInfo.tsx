import type { PCComponent } from '../types/pc';

interface ComponentInfoProps {
  component: PCComponent;
}

export function ComponentInfo({ component }: ComponentInfoProps) {
  return (
    <div className="component-info surface-card" enable-xr>
      <div className="info-header">
        <h4>{component.name}</h4>
        <span className="brand-badge">{component.brand}</span>
      </div>

      <div className="info-specs">
        <h5>Specifications</h5>
        {Object.entries(component.specs).map(([key, value]) => (
          <div key={key} className="spec-row">
            <span className="spec-label">{key}:</span>
            <span className="spec-value">{value}</span>
          </div>
        ))}
      </div>

      <div className="info-price">
        <strong className="price">${component.price.toLocaleString()}</strong>
      </div>
    </div>
  );
}
