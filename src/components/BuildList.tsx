import type { PC, PCKey } from '../types/pc';

interface BuildListProps {
  pc: PC;
  onRemoveComponent: (key: PCKey) => void;
  totalPrice: number;
  componentCount: number;
  /** When false, omit the title block (shown in SpatialPanel header instead). */
  showHeader?: boolean;
}

const categoryLabels: Record<PCKey, string> = {
  cpu: 'CPU',
  motherboard: 'Motherboard',
  gpu: 'GPU',
  ram: 'RAM',
  storage: 'Storage',
  cooler: 'Cooler',
  psu: 'PSU',
  case: 'Case',
};

export function BuildList({
  pc,
  onRemoveComponent,
  totalPrice,
  componentCount,
  showHeader = true,
}: BuildListProps) {
  const buildItems = Object.entries(pc).filter(([, component]) => component);

  return (
    <div className="build-list-content">
      {showHeader && (
        <div className="panel-header">
          <h2>Your Build</h2>
          <p className="panel-subtitle">
            {componentCount} of 8 components
          </p>
        </div>
      )}

      <div className="build-items">
        {buildItems.length === 0 ? (
          <div className="empty-state">
            <p>No components added yet</p>
            <p style={{ fontSize: '12px' }}>Select parts from the list →</p>
          </div>
        ) : (
          buildItems.map(([key, component]) => (
            <div key={key} className="build-item surface-card" enable-xr>
              <div className="item-header">
                <div>
                  <div className="item-category">
                    {categoryLabels[key as PCKey]}
                  </div>
                  <div className="item-name">{component.name}</div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => onRemoveComponent(key as PCKey)}
                  title="Remove from build"
                >
                  ✕
                </button>
              </div>
              <div className="item-price">${component.price.toLocaleString()}</div>
            </div>
          ))
        )}
      </div>

      {buildItems.length > 0 && (
        <div className="build-summary surface-card" enable-xr>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
