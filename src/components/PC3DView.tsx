import { ModelViewer } from './ModelViewer';
import type { PC } from '../types/pc';

interface PC3DViewProps {
  pc: PC;
}

export function PC3DView({ pc }: PC3DViewProps) {
  return <ModelViewer pc={pc} />;
}
