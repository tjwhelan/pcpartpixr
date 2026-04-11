import { Reality, Material, World, Sphere, Cylinder, Cone } from '@webspatial/react-sdk';

interface PlantContainerProps {
  completionPercentage: number;
}

export function PlantContainer({ completionPercentage }: PlantContainerProps) {
  // Determine which plant parts to render based on completion percentage
  const showStem = completionPercentage >= 20;
  const showBranches = completionPercentage >= 40;
  const showLeaves = completionPercentage >= 60;
  const showFlowers = completionPercentage >= 80;

  return (
    <Reality
      style={{
        width: '100%',
        height: '100%',
        '--xr-depth': '300px',
      } as React.CSSProperties}
      enable-xr
    >
      {/* Define materials */}
      <Material type="unlit" id="soil-brown" color="#654321" />
      <Material type="unlit" id="stem-brown" color="#6B4423" />
      <Material type="unlit" id="leaf-green" color="#2ecc71" />
      <Material type="unlit" id="flower-red" color="#e74c3c" />
      <Material type="unlit" id="flower-yellow" color="#f1c40f" />

      {/* World container for 3D content */}
      <World>
        {/* Dirt/soil base */}
        <Sphere
          radius={0.15}
          materials={['soil-brown']}
          position={{ x: 0, y: -0.3, z: 0 }}
        />

        {/* Main stem - grows from 0% to show at 20%+ */}
        {showStem && (
          <Cylinder
            radius={0.02}
            height={0.25}
            materials={['stem-brown']}
            position={{ x: 0, y: -0.1, z: 0 }}
          />
        )}

        {/* Left branch */}
        {showBranches && (
          <Cylinder
            radius={0.015}
            height={0.15}
            materials={['stem-brown']}
            position={{ x: -0.1, y: 0.05, z: 0 }}
            rotation={{ x: 0, y: 0, z: 0.5 }}
          />
        )}

        {/* Right branch */}
        {showBranches && (
          <Cylinder
            radius={0.015}
            height={0.15}
            materials={['stem-brown']}
            position={{ x: 0.1, y: 0.05, z: 0 }}
            rotation={{ x: 0, y: 0, z: -0.5 }}
          />
        )}

        {/* Left leaves */}
        {showLeaves && (
          <Cone
            radius={0.08}
            height={0.12}
            materials={['leaf-green']}
            position={{ x: -0.12, y: 0.08, z: 0 }}
            rotation={{ x: 0, y: 0, z: 0.6 }}
          />
        )}

        {/* Right leaves */}
        {showLeaves && (
          <Cone
            radius={0.08}
            height={0.12}
            materials={['leaf-green']}
            position={{ x: 0.12, y: 0.08, z: 0 }}
            rotation={{ x: 0, y: 0, z: -0.6 }}
          />
        )}

        {/* Center top leaves */}
        {showLeaves && (
          <Cone
            radius={0.06}
            height={0.1}
            materials={['leaf-green']}
            position={{ x: 0, y: 0.15, z: 0 }}
          />
        )}

        {/* Red flower on left branch tip */}
        {showFlowers && (
          <Sphere
            radius={0.06}
            materials={['flower-red']}
            position={{ x: -0.18, y: 0.12, z: 0 }}
          />
        )}

        {/* Yellow flower on right branch tip */}
        {showFlowers && (
          <Sphere
            radius={0.06}
            materials={['flower-yellow']}
            position={{ x: 0.18, y: 0.12, z: 0 }}
          />
        )}

        {/* Red flower on top */}
        {showFlowers && (
          <Sphere
            radius={0.05}
            materials={['flower-red']}
            position={{ x: 0, y: 0.23, z: 0 }}
          />
        )}
      </World>
    </Reality>
  );
}
