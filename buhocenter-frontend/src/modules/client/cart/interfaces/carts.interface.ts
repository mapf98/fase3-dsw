import { Product } from "@/modules/client/products/interfaces/products.interface";

// se debe eliminar ServiceCart.
export interface ServiceCart {
  id?: number;
  quantity?: number;
  services?: { id: number }[];
  products?: Array<any>;
  productCarts?: Product[];
  customer?: {
    id: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export class ProductCarts {
  createdAt?: string;
  id?: number;
  product?: Product;
  quantity?: number;
  updatedAt?: string;
  user?: {
    id: number;
  };
}

export interface CartInterface {
  createdAt?: string;
  id?: number;
  cart?: ProductCarts[];
  updatedAt?: string;
}
