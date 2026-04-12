import { useState } from 'react';
import type { PC, PCComponent, ComponentCategory } from '../types/pc';
import componentsData from '../data/pcComponents.json';
import { ComponentSelector } from './ComponentSelector';
import { ComponentModelPreview } from './ComponentModelPreview';
import { ComponentInfo } from './ComponentInfo';
import { BuildList } from './BuildList';
import { SpatialPanel } from './SpatialPanel';

type CategoryKey = keyof ComponentCategory;
type PCKey = keyof PC;

const categoryMap: Record<CategoryKey, PCKey> = {
  cpus: 'cpu',
  motherboards: 'motherboard',
  gpus: 'gpu',
  ram: 'ram',
  storage: 'storage',
  coolers: 'cooler',
  psu: 'psu',
  cases: 'case',
};

export function PCBuilder() {
  const [pc, setPC] = useState<PC>({});
  const [selectedComponent, setSelectedComponent] = useState<PCComponent | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('cpus');

  const categories: Array<{
    id: CategoryKey;
    label: string;
  }> = [
    { id: 'cpus', label: 'CPU' },
    { id: 'motherboards', label: 'Motherboard' },
    { id: 'gpus', label: 'GPU' },
    { id: 'ram', label: 'RAM' },
    { id: 'storage', label: 'Storage' },
    { id: 'coolers', label: 'Cooler' },
    { id: 'psu', label: 'PSU' },
    { id: 'cases', label: 'Case' },
  ];

  const handleSelectComponent = (component: PCComponent) => {
    setSelectedComponent(component);
  };

  const handleAddToBuild = (component: PCComponent) => {
    const pcKey = categoryMap[selectedCategory];
    setPC((prev) => ({ ...prev, [pcKey]: component }));
  };

  const handleRemoveFromBuild = (componentKey: PCKey) => {
    setPC((prev) => {
      const updated = { ...prev };
      delete updated[componentKey];
      return updated;
    });
  };

  const totalPrice =
    Object.values(pc).reduce((sum, component) => {
      return sum + (component?.price || 0);
    }, 0) || 0;

  const componentCount = Object.values(pc).filter((c) => c).length;

  const previewPcKey = categoryMap[selectedCategory];
  const selectedForPreview: PC = selectedComponent
    ? { [previewPcKey]: selectedComponent }
    : {};

  const detailsLayout = selectedComponent
    ? 'translateX(-50%)'
    : 'translate(-50%, -50%)';

  return (
    <main className="pc-builder spatial-scene-root" enable-xr-monitor>
      <SpatialPanel
        className="spatial-tile-build floating-panel build-list-panel"
        layoutTransform="translateY(-50%)"
        header={
          <div className="panel-header">
            <h2>Your Build</h2>
            <p className="panel-subtitle">{componentCount} of 8 components</p>
          </div>
        }
      >
        <BuildList
          pc={pc}
          onRemoveComponent={handleRemoveFromBuild}
          totalPrice={totalPrice}
          componentCount={componentCount}
          showHeader={false}
        />
      </SpatialPanel>

      {selectedComponent ? (
        <ComponentModelPreview
          pc={selectedForPreview}
          asSpatialVolume
          volumeTitle={selectedComponent.name}
        />
      ) : null}

      <SpatialPanel
        className={`spatial-tile-details-panel floating-panel ${
          selectedComponent ? 'spatial-tile-details-panel--selected' : 'spatial-tile-details-panel--idle'
        }`}
        layoutTransform={detailsLayout}
        header={
          <div className="panel-header">
            <h2>{selectedComponent ? selectedComponent.name : 'Select a Component'}</h2>
            <p className="panel-subtitle">
              {selectedComponent ? 'Details and specs' : 'Choose a part from the list'}
            </p>
          </div>
        }
      >
        {selectedComponent ? (
          <>
            <ComponentInfo component={selectedComponent} />
            <button
              className="add-to-build-btn"
              onClick={() => handleAddToBuild(selectedComponent)}
            >
              Add to Build
            </button>
          </>
        ) : (
          <div className="details-placeholder">
            <p>Select a component to view details</p>
          </div>
        )}
      </SpatialPanel>

      <SpatialPanel
        className="spatial-tile-parts floating-panel parts-list-panel"
        layoutTransform="translateY(-50%)"
        header={
          <div className="panel-header">
            <h2>Components List</h2>
            <p className="panel-subtitle">Select components</p>
          </div>
        }
      >
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <ComponentSelector
          category={selectedCategory}
          components={componentsData[selectedCategory]}
          selectedComponent={selectedComponent}
          onSelectComponent={handleSelectComponent}
        />
      </SpatialPanel>
    </main>
  );
}
