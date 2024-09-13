import { LargeNumberLike } from "crypto";

// interfaces.ts
interface Acid {
  charge: null;
  element_name: string;
  element_symbol: string;
  id: number;
  other_info: string;
}

interface Compound {
  charge: number;
  element_name: string;
  element_symbol: string;
  id: number;
  other_info: string;
}

interface Element {
  atomic_number: number;
  element_name: string;
  element_symbol: string;
  id: number;
  other_info: string;
}

interface Ion {
  charge: number;
  element_name: string;
  element_symbol: string;
  id: number;
  other_info: string;
}

export interface ChemistryData {
  acids: Acid[];
  compounds: Compound[];
  elements: Element[];
  ions: Ion[];
  phrases: string[];
}
