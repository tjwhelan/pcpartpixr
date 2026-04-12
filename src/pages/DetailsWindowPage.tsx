import { ComponentModelPreview } from '../components/ComponentModelPreview';
import { ComponentInfo } from '../components/ComponentInfo';
import { useBuildWorkspaceSync } from '../hooks/useBuildWorkspaceSync';
import { categoryMap, type CategoryKey } from '../lib/pcCategoryMap';
import type { PC } from '../types/pc';

export function DetailsWindowPage() {
  const { pc, setPC, selectedComponent, selectedCategory } = useBuildWorkspaceSync();

  const previewPcKey = categoryMap[selectedCategory as CategoryKey];
  const selectedForPreview: PC = selectedComponent
    ? { [previewPcKey]: selectedComponent }
    : {};

  const handleAddToBuild = () => {
    if (!selectedComponent) return;
    const pcKey = categoryMap[selectedCategory as CategoryKey];
    setPC((prev) => ({ ...prev, [pcKey]: selectedComponent }));
  };

  return (
    <main className="pc-builder details-window" enable-xr-monitor>
      <div className="details-window-shell">
        <section className="floating-panel details-panel" enable-xr>
          {selectedComponent ? (
            <>
              <div className="details-model-viewport details-model-viewport--window" aria-label="3D preview">
                <ComponentModelPreview pc={selectedForPreview} embedded />
              </div>
              <div className="details-panel-frosted">
                <ComponentInfo component={selectedComponent} />
                <button type="button" className="add-to-build-btn" onClick={handleAddToBuild}>
                  Add to Build
                </button>
              </div>
            </>
          ) : (
            <div className="details-placeholder">
              <p>Select a component in the parts list to view details and the 3D model.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
