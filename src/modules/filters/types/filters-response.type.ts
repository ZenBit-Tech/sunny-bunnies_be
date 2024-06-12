export type FilterItem = {
  id: number;
  name: string;
};

export type FiltersResponse = {
  brands: FilterItem[];
  categories: FilterItem[];
  colors: FilterItem[];
  materials: FilterItem[];
  sizes: FilterItem[];
  styles: FilterItem[];
};
