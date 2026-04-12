/**
 * Eight outward rays (cardinal + diagonal) for the spatial move handle.
 */
export function SpatialMoveIcon() {
  const dirs: [number, number][] = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
  ];
  const inner = 3.25;
  const outer = 9.25;

  return (
    <svg className="spatial-move-icon" viewBox="0 0 24 24" width={18} height={18} aria-hidden>
      <g stroke="currentColor" strokeWidth={2.1} strokeLinecap="round" fill="none">
        {dirs.map(([dx, dy], i) => {
          const L = Math.hypot(dx, dy);
          const ux = dx / L;
          const uy = dy / L;
          return (
            <line
              key={i}
              x1={12 + ux * inner}
              y1={12 + uy * inner}
              x2={12 + ux * outer}
              y2={12 + uy * outer}
            />
          );
        })}
      </g>
    </svg>
  );
}
