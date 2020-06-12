import { ProductStateInterface } from "./interfaces/products.state.interface";

export const PRODUCT_EMPTY_STATE: ProductStateInterface = {
  products: [],
  productsAndPhotosLoaded: false,
  productsDaily: [],
  productsDailyAndPhotosLoaded: false,
  totalProducts: 0,
  itemDetail: {},
};
