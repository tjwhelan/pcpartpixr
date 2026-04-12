export interface PCComponent {
  id: string;
  name: string;
  brand: string;
  specs: Record<string, string | number | undefined>;
  price: number;
  modelUrl: string;
}

export type PCKey = 'cpu' | 'motherboard' | 'gpu' | 'ram' | 'storage' | 'cooler' | 'psu' | 'case';

export interface PC {
  id?: string;
  cpu?: PCComponent;
  gpu?: PCComponent;
  motherboard?: PCComponent;
  ram?: PCComponent;
  storage?: PCComponent;
  psu?: PCComponent;
  case?: PCComponent;
  cooler?: PCComponent;
  totalPrice?: number;
}

export interface ComponentCategory {
  cpus: PCComponent[];
  gpus: PCComponent[];
  motherboards: PCComponent[];
  ram: PCComponent[];
  storage: PCComponent[];
  psu: PCComponent[];
  cases: PCComponent[];
  coolers: PCComponent[];
}
