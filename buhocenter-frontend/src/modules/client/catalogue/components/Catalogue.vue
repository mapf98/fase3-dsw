<template>
  <v-row style="height: auto;">
    <div
      style="width: auto; position: relative;"
      class="d-none d-md-flex d-lg-flex"
    >
      <Aside> </Aside>
    </div>
    <v-col cols="12" lg="9" md="9" sm="12">
      <v-container fluid>
        <ProductCard />
        <v-pagination
          color="primary"
          v-model="page"
          :length="getLength"
          :total-visible="7"
        ></v-pagination>
      </v-container>
    </v-col>
    <v-snackbar
      v-model="errorLoadingContent"
      top
      :timeout="timeout"
      color="error"
    >
      {{ $t("ERROR_LOAD_PRODUCTS") }}
      <v-btn color="white" text @click="closeSnackbar">{{ $t("CLOSE") }}</v-btn>
    </v-snackbar>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ProductCard from "./ProductCard.vue";
import Aside from "./Aside.vue";
import { products, layout } from "@/store/namespaces";
import ProductsTypes from "@/store/products/methods/products.methods";
import LayoutTypes from "@/store/layout/methods/layout.methods";
import { Watch } from "vue-property-decorator";
import { Product } from "@/modules/client/products/interfaces/products.interface";

@Component({
  components: {
    ProductCard,
    Aside,
  },
})
export default class Catalogue extends Vue {
  page = 1;
  productsDisplayed = 8;
  timeout = 5000;
  errorLoadingContent = false;

  @Watch("page")
  async changePage() {
    await this.fetchProducts();
  }

  closeSnackbar() {
    this.errorLoadingContent = false;
  }

  get getLength() {
    const length: number = this.GET_TOTAL_PRODUCTS - this.productsDisplayed + 1;

    if (length < 0) {
      return 1;
    }

    return length;
  }

  async fetchProducts() {
    this.SET_PRODUCT_PHOTOS_NOT_LOADED(false);
    const fetched: boolean = await this.FETCH_PRODUCTS({
      page: this.page,
      catalogueId: this.GET_CATALOGUE_ID,
    });

    if (!fetched) {
      this.errorLoadingContent = true;
    } else {
      await this.FETCH_PRODUCT_PHOTO_BY_NAME(this.GET_PRODUCTS);
    }
  }

  async mounted() {
    await this.fetchProducts();
  }

  @products.Action(ProductsTypes.actions.FETCH_PRODUCTS) private FETCH_PRODUCTS;
  @products.Action(ProductsTypes.actions.FETCH_PRODUCT_PHOTO_BY_NAME)
  private FETCH_PRODUCT_PHOTO_BY_NAME!: (products: Product[]) => boolean;
  @products.Action(ProductsTypes.actions.SET_PRODUCT_PHOTOS_NOT_LOADED)
  private SET_PRODUCT_PHOTOS_NOT_LOADED!: (loaded: boolean) => boolean;
  @products.Getter(ProductsTypes.getters.GET_PRODUCTS)
  private GET_PRODUCTS!: Product[];
  @products.Getter(ProductsTypes.getters.GET_TOTAL_PRODUCTS)
  private GET_TOTAL_PRODUCTS!: number;

  @layout.Getter(LayoutTypes.getters.GET_CATALOGUE_ID)
  private GET_CATALOGUE_ID?: number;
}
</script>
