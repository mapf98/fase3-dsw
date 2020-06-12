export interface Category {
  createdAt?: string;
  icon?: string;
  id?: number;
  name?: string;
  term?: string;
  updatedAt?: string;
}

export interface Categories {
  categories?: Category[];
}
