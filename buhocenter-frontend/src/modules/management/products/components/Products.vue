<template>
  <div class="container-page" style="position: relative;">
    <v-snackbar v-model="snackbarfail" top :timeout="timeout" color="error">
      {{ $t("ERROR_SAVE_PRODUCT") }}
      <v-btn color="white" text @click="snackbarfail = false">Cerrar</v-btn>
    </v-snackbar>
    <v-snackbar
      v-model="snackbarCatalogues"
      top
      :timeout="timeout"
      color="error"
    >
      {{ $t("ERROR_GET_CATALOGUES") }}
      <v-btn color="white" text @click="snackbarCatalogues = false"
        >Cerrar</v-btn
      >
    </v-snackbar>
    <v-snackbar
      v-model="snackbarSuccessCreated"
      top
      :timeout="timeout"
      color="success"
    >
      {{ $t("SUCCESS_SAVE_PRODUCT") }}
      <v-btn color="white" text @click="snackbarSuccessCreated = false"
        >Cerrar</v-btn
      >
    </v-snackbar>
    <v-snackbar v-model="snackbarProducts" top :timeout="timeout" color="error">
      {{ $t("ERROR_LOAD_PRODUCTS") }}
      <v-btn color="white" text @click="snackbarProducts = false">Cerrar</v-btn>
    </v-snackbar>
    <v-snackbar
      v-model="snackbarProviders"
      top
      :timeout="timeout"
      color="error"
    >
      {{ $t("ERROR_LOAD_PROVIDERS") }}
      <v-btn color="white" text @click="snackbarProviders = false"
        >Cerrar</v-btn
      >
    </v-snackbar>
    <v-snackbar
      v-model="snackbarCategories"
      top
      :timeout="timeout"
      color="error"
    >
      {{ $t("ERROR_LOAD_CATEGORIES") }}
      <v-btn color="white" text @click="snackbarCategories = false"
        >Cerrar</v-btn
      >
    </v-snackbar>
    <v-snackbar v-model="snackbarBrands" top :timeout="timeout" color="error">
      {{ $t("ERROR_LOAD_BRANDS") }}
      <v-btn color="white" text @click="snackbarBrands = false">Cerrar</v-btn>
    </v-snackbar>
    <v-snackbar
      v-model="snackbarSuccess"
      top
      :timeout="timeout"
      color="success"
    >
      {{ $t("PRODUCT_UPDATED_SUCCESS") }}
      <v-btn color="white" text @click="snackbarSuccess = false">Cerrar</v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar" top :timeout="timeout" color="success">
      {{ $t("PRODUCT_UPDATED_SUCCESS") }}
      <v-btn color="white" text @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>

    <h2>{{ $t("PRODUCTS") }}</h2>
    <template>
      <v-data-table
        :headers="headers"
        :items="getProducts"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>{{ $t("PRODUCTS") }}</v-toolbar-title>

            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="800px" persistent>
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">{{
                  $t("NEW_PRODUCT")
                }}</v-btn>
              </template>
              <v-card lg="36">
                <v-card-title>
                  <span class="headline">{{ $t("NEW_PRODUCT") }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="6" lg="12">
                        <v-text-field
                          :label="$t('NAME')"
                          v-model="name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" lg="12">
                        <v-text-field
                          :label="$t('DESCRIPTION')"
                          v-model="description"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" lg="12">
                        <v-text-field
                          type="number"
                          :label="$t('PRICE')"
                          v-model="price"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" lg="12">
                        <v-text-field
                          type="number"
                          :label="$t('SHIPPING_PRICE')"
                          v-model="shippingPrice"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" lg="12">
                        <v-text-field
                          type="number"
                          :label="$t('QUANTITY_AVAILABLE_PRODUCT')"
                          v-model="quantityAvailable"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" lg="12">
                        <v-text-field
                          type="number"
                          :label="$t('MIN_QUANTITY_AVAILABLE_PRODUCTS')"
                          v-model="MQA"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" lg="12">
                        <v-select
                          :items="getBrands"
                          :label="$t('BRAND')"
                          v-model="brandSelected"
                          item-text="name"
                          item-value="id"
                          item-v
                          hint="accessibles brands"
                          persistent-hint
                        >
                        </v-select>
                      </v-col>
                    </v-row>
                    <v-container>
                      <v-row>
                        <v-col cols="6" lg="12">
                          <v-select
                            :items="getCategories"
                            name="category"
                            :label="$t('CATEGORIES')"
                            v-model="categorieSelected"
                            item-text="name"
                            item-value="id"
                            item-v
                            hint="this is a optional field"
                            persistent-hint
                            required
                          >
                          </v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6" lg="12">
                          <v-select
                            :items="getProviders"
                            :label="$t('PROVIDER')"
                            v-model="providerSelected"
                            item-text="name"
                            item-value="id"
                            item-v
                            multiple
                            hint="this is a optional field"
                            persistent-hint
                          >
                          </v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6" lg="12">
                          <v-select
                            :items="getCatalogues"
                            :label="$t('CATALOGUES')"
                            v-model="catalogueSelected"
                            item-text="name"
                            item-value="id"
                            item-v
                            hint="this is a optional field"
                            persistent-hint
                          >
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                    <h3>{{ $t("ADD_PRODUCT_IMAGE") }}</h3>
                    <v-row>
                      <v-col>
                        <input
                          type="file"
                          id="file"
                          ref="myFiles"
                          class="custom-file-input"
                          @change="previewFiles"
                          lg="12"
                        />
                      </v-col>
                    </v-row>
                    <v-container v-if="letDimensionMod">
                      <h3>{{ $t("PRODUCT_DIMENSION") }}</h3>
                      <v-row>
                        <v-col>
                          <v-text-field
                            type="number"
                            :label="$t('PRODUCT_DEPTH')"
                            v-model="Z"
                            lg="12"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            type="number"
                            :label="$t('PRODUCT_WIDTH')"
                            v-model="X"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            type="number"
                            :label="$t('PRODUCT_HEIGHT')"
                            v-model="Y"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>

                    <v-alert type="error" v-if="snackbarErrorCreate">
                      ¡Name, description, price , shipping price , minumun
                      quantity avalaible, image , dimensions and brand required!
                    </v-alert>
                    <v-alert type="error" v-if="snackbarMoreMinThanAvai">
                      ¡You can't register less products in inventary than the
                      minimun quantity avalible you choose!
                    </v-alert>
                    <v-alert type="error" v-if="snackbarCataloguesCategories">
                      ¡You can't register a product in a catalogue without a
                      category!
                    </v-alert>
                  </v-container>
                  <button class="login100-form-btn" lg="12" v-if="isLoading">
                    <v-progress-circular
                      :size="40"
                      color="white"
                      indeterminate
                    ></v-progress-circular>
                  </button>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close()">{{
                    $t("CANCEL")
                  }}</v-btn>
                  <v-btn color="blue darken-1" text @click="save(item)">{{
                    $t("SAVE")
                  }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">{{ $t("RESET") }}</v-btn>
        </template>
      </v-data-table>
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProductsTypes from "@/store/products/methods/products.methods";
import BrandsTypes from "@/store/brands/methods/brands.methods";
import ProvidersTypes from "@/store/providers/methods/providers.methods";
import {
  brands,
  providers,
  categoryModule,
  products,
  catalogueModule,
} from "../../../../store/namespaces";
import {
  ProductCreate,
  dimensionDto,
  ProductPhotoDto,
  InventoryProduct,
  Product,
} from "../../../client/products/interfaces/products.interface";
import CategoriesMethods from "@/store/categories/methods/categories.methods";
import CatalogueMethods from "@/store/catalogue/methods/catalogue.methods";
import { BrandInterface } from "../../../client/brand/interfaces/brand.interface";
import {
  Catalogues,
  ProductCatalogue,
} from "../../../client/catalogues/interfaces/catalogues.interface";
import { Category } from "../../../client/categories/interfaces/categories.interface";
import { Provider } from "../../../client/provider/interfaces/provider.interface";

@Component
//recuerda arreglar las categorias
export default class DashboardProducts extends Vue {
  dialog = false;
  name = "";
  description = "";
  price = 0;
  shippingPrice = 0;
  MQA = 0;
  quantityAvailable = 0;
  brandSelected = 0;
  providerSelected: number[] = [];
  categorieSelected = 0;
  catalogueSelected = 0;
  files: any;
  selectedFiles = null;
  product: any;
  item: any;
  X = 0;
  Y = 0;
  Z = 0;

  isLoading = false;

  snackbarProducts = false;
  snackbarProviders = false;
  snackbarCategories = false;
  snackbarCatalogues = false;
  snackbarBrands = false;
  snackbarSuccess = false;
  snackbarMoreMinThanAvai = false;
  snackbarCataloguesCategories = false;

  timeout = 5000;
  snackbar = false;
  snackbarErrorCreate = false;
  snackbarSuccessCreated = false;
  snackbarfail = false;

  letMod = false;
  letDimensionMod = true;
  firebaseResponse = false;
  headers = [
    {
      text: "Product Name",
      align: "start",
      sortable: false,
      value: "name",
    },
    { text: "Price", value: "price" },
    { text: "Shipping Price", value: "shippingPrice" },
    { text: "Minimum Quantity Available", value: "minimumQuantityAvailable" },
    { text: "Actions", value: "actions", sortable: false },
  ];
  editedIndex = -1;
  editedItem = {
    id: 0,
  };
  defaultItem = {
    name: "",
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
  };

  formTitle() {
    if (this.editedIndex === -1) {
      this.letMod = false;
      this.letDimensionMod = true;
    } else {
      this.letMod = true;
      this.letDimensionMod = false;
    }
    return this.editedIndex === -1
      ? "New Item [all field must be filled]"
      : "Update Product data";
  }

  changeDialog(val) {
    this.dialog = val;
  }

  editItem(item) {
    this.editedIndex = this.getProducts.indexOf(item);
    this.editedIndex;
    this.editedItem = Object.assign({}, item);
    this.letDimensionMod = false;
    this.changeDialog(true);
  }

  async deleteItem(item) {
    this.editedItem = Object.assign({}, item);
    if (confirm("Are you sure you want to delete this item?")) {
      this.isLoading = true;
      this.snackbar = await this.deleteProduct(this.editedItem.id);
      this.$router.go(0);
    }
  }

  close() {
    this.changeDialog(false);
    this.$nextTick(() => {
      this.editedIndex = -1;
    });
    this.letDimensionMod = true;
    this.name = "";
    this.description = "";
    this.price = 0;
    this.shippingPrice = 0;
    this.MQA = 0;
    this.quantityAvailable = 0;
    this.brandSelected = 0;
    this.providerSelected = [];
    this.categorieSelected = 0;
    this.catalogueSelected = 0;
    this.selectedFiles = null;
    this.X = 0;
    this.Y = 0;
    this.Z = 0;
  }

  async save() {
    this.isLoading = true;
    this.editedIndex;
    if (this.editedIndex == -1) {
      if (
        this.name == "" ||
        this.description == "" ||
        this.price == 0 ||
        this.shippingPrice == 0 ||
        this.MQA == 0 ||
        this.quantityAvailable == 0 ||
        this.brandSelected == 0 ||
        this.providerSelected == [] ||
        this.categorieSelected == 0 ||
        this.catalogueSelected == 0 ||
        this.selectedFiles == null ||
        this.X == 0 ||
        this.Y == 0 ||
        this.Z == 0
      ) {
        this.snackbarErrorCreate = true;
        this.isLoading = false;
      } else {
        this.checkQuantity();
      }
    } else {
      ("updateProductObject");
      this.updateProductObject();
    }
  }

  previewFiles(event) {
    this.isLoading = true;
    this.selectedFiles = event.target.files[0];
    this.isLoading = false;
  }

  async mounted() {
    this.snackbarBrands = await this.fetchBrands();
    this.snackbarProviders = await this.fetchProviders();
    this.snackbarCategories = await this.fetchCategories();
    this.snackbarProducts = await this.fetchAllProducts();
    this.snackbarCatalogues = await this.fetchAllCatalogues();
  }

  async createProductObject() {
    this.snackbarErrorCreate = false;
    const newProduct: ProductCreate = {
      id: this.editedItem.id,
      productName: this.name,
      description: this.description,
      price: this.price,
      shippingPrice: this.shippingPrice,
      minimumQuantityAvailable: this.MQA,

      category: {
        id: this.categorieSelected,
      },
      provider: {
        id: this.providerSelected,
      },
      brand: {
        id: this.brandSelected,
      },
    };

    await this.createProduct(newProduct);
    if (this.product !== false) {
      `el id del producto es ${this.product.id}`;
      const imageAndProductID: ProductPhotoDto = {
        id: this.product.id,
        // eslint-disable-next-line
        // @ts-ignore
        imageName: this.selectedFiles.name,
      };

      const imageAndProductForFirebase = {
        id: this.product.id,
        image: this.selectedFiles,
      };

      imageAndProductID;

      const dimensionSO: dimensionDto = {
        dimension: {
          width: this.X,
          height: this.Y,
          long: this.Z,
        },
        id: this.product.id,
      };

      const inventory: InventoryProduct = {
        quantity: this.quantityAvailable,
        product: {
          id: this.product.id,
        },
      };

      const newCatalogue: ProductCatalogue = {
        id: this.catalogueSelected,
        category: { id: this.categorieSelected },
        product: { id: this.product.id },
      };
      newCatalogue;

      await this.saveCatalogues(newCatalogue);
      await this.saveInventory(inventory);
      this.snackbarSuccessCreated = true;
      this.saveProductDimension(dimensionSO);
      this.firebaseResponse = await this.uploadImage(
        imageAndProductForFirebase
      );
      this.firebaseResponse;
      if (this.firebaseResponse) {
        //VERIFICAR 1
        const imageAndProduct: ProductPhotoDto = {
          id: this.editedItem.id,
          // eslint-disable-next-line
          // @ts-ignore
          imageName: this.selectedFiles.name,
        };
        await this.saveProductPhotos(imageAndProductID);
        //aqui llama a guardar el inventorio
        this.selectedFiles = null;
      }
    } else {
      this.snackbarfail = true;
      this.X = 0;
      this.Y = 0;
      this.Z = 0;
    }
    this.isLoading = false;
    this.product = true;
    this.name = "";
    this.description = "";
    this.price = 0;
    this.shippingPrice = 0;
    this.MQA = 0;
    this.quantityAvailable = 0;
    this.brandSelected = 0;
    this.providerSelected = [];
    this.categorieSelected = 0;
    this.catalogueSelected = 0;
    this.selectedFiles = null;
    this.X = 0;
    this.Y = 0;
    this.Z = 0;
    this.changeDialog(false);
    this.$router.go(0);
  }

  async updateProductObject() {
    if (this.categorieSelected == 0 && this.catalogueSelected !== 0) {
      this.snackbarCataloguesCategories = true;
    } else {
      const newProduct: ProductCreate = {
        id: this.editedItem.id,
        productName: this.name,
        description: this.description,
        price: this.price,
        shippingPrice: this.shippingPrice,
        minimumQuantityAvailable: this.MQA,

        category: {
          id: this.categorieSelected,
        },
        provider: {
          id: this.providerSelected,
        },
        brand: {
          id: this.brandSelected,
        },
      };

      if (this.quantityAvailable !== 0) {
        `actualizando cantidad con = ${this.quantityAvailable}`;
        const inventory: InventoryProduct = {
          quantity: this.quantityAvailable,
          product: {
            id: this.editedItem.id,
          },
        };
        await this.updateInventory(inventory);
      }

      if (this.selectedFiles !== null) {
        ("actualizando imagen");
        const imageAndProductIDForFirebase = {
          image: this.selectedFiles,
          id: this.editedItem.id,
        };
        const imageAndProductIDForDB: ProductPhotoDto = {
          // eslint-disable-next-line
          // @ts-ignore
          imageName: this.selectedFiles.name,
          id: this.editedItem.id,
        };
        this.isLoading = true;
        this.firebaseResponse = await this.uploadImage(
          imageAndProductIDForFirebase
        );
        if (this.firebaseResponse) {
          //VERIFICAR 3
          const imageAndProduct: ProductPhotoDto = {
            id: this.editedItem.id,
            // eslint-disable-next-line
            // @ts-ignore
            imageName: this.selectedFiles.name,
          };

          await this.saveProductPhotos(imageAndProductIDForDB);

          this.selectedFiles = null;
        }
        this.selectedFiles = null;
      }
      ("actualizando producto..");
      this.snackbarSuccess = await this.updateProduct(newProduct);
      if (this.categorieSelected !== 0 && this.catalogueSelected !== 0) {
        ("actualizando categoria");
        const newCatalogue: ProductCatalogue = {
          id: this.catalogueSelected,
          category: { id: this.categorieSelected },
          product: { id: this.editedItem.id },
        };
        newCatalogue;
        await this.saveCatalogues(newCatalogue);
      }
      ("producto actualizado");
      this.isLoading = false;
      this.name = "";
      this.description = "";
      this.price = 0;
      this.shippingPrice = 0;
      this.MQA = 0;
      this.quantityAvailable = 0;
      this.brandSelected = 0;
      this.providerSelected = [];
      this.categorieSelected = 0;
      this.catalogueSelected = 0;
      this.selectedFiles = null;
      this.X = 0;
      this.Y = 0;
      this.Z = 0;
      this.changeDialog(false);
      this.$router.go(0);
    }
  }

  checkQuantity() {
    if (parseInt(`${this.MQA}`) < parseInt(`${this.quantityAvailable}`)) {
      this.createProductObject();
    } else {
      this.snackbarMoreMinThanAvai = true;
      this.isLoading = false;
      ("no puede porque MQA >quantity");
    }
  }

  @brands.Action(BrandsTypes.actions.FETCH_BRANDS) fetchBrands!: () => boolean;
  @brands.Getter(BrandsTypes.getters.GET_BRANDS) getBrands!: BrandInterface[];

  @providers.Action(ProvidersTypes.actions.FETCH_PROVIDERS)
  fetchProviders!: () => boolean;

  @providers.Getter(ProvidersTypes.getters.GET_PROVIDERS)
  getProviders!: Provider[];

  @products.Getter(ProductsTypes.getters.GET_PRODUCT_INDEX_ID)
  getProductIndexID!: number;
  @products.Getter(ProductsTypes.getters.GET_PRODUCTS) getProducts!: Product[];
  @products.Action(ProductsTypes.actions.UPDATE_PRODUCT) updateProduct!: (
    product: ProductCreate
  ) => boolean;
  @products.Action(ProductsTypes.actions.FETCH_ALL_PRODUCTS)
  fetchAllProducts!: () => boolean;
  @products.Action(ProductsTypes.actions.DELETE_PRODUCT) deleteProduct!: (
    id: number
  ) => boolean;
  @products.Action(ProductsTypes.actions.CREATE_PRODUCT) createProduct!: (
    product: ProductCreate
  ) => Product | boolean;
  @products.Action(ProductsTypes.actions.UPLOAD_IMAGE) uploadImage;
  @products.Action(ProductsTypes.actions.SAVE_PRODUCT_PHOTOS)
  saveProductPhotos!: (imageAndProduct: ProductPhotoDto) => boolean;
  @products.Action(ProductsTypes.actions.SAVE_PRODUCT_DIMENSION)
  saveProductDimension!: (imageAndProduct: dimensionDto) => boolean;

  @products.Action(ProductsTypes.actions.SAVE_INVENTORY_QUANTITY) saveInventory;
  @products.Action(ProductsTypes.actions.UPDATE_INVENTORY_QUANTITY)
  updateInventory;

  @categoryModule.Action(CategoriesMethods.actions.FETCH_CATEGORIES)
  private fetchCategories!: () => boolean;

  @categoryModule.Getter(CategoriesMethods.getters.GET_CATEGORIES)
  private getCategories!: Category[];

  @catalogueModule.Action(CatalogueMethods.actions.FETCH_ALL_CATALOGUES)
  private fetchAllCatalogues!: () => boolean;
  @catalogueModule.Action(CatalogueMethods.actions.SAVE_CATALOGUE)
  private saveCatalogues!: (data: ProductCatalogue) => boolean;

  @catalogueModule.Getter(CatalogueMethods.getters.GET_CATALOGUES)
  private getCatalogues?: Catalogues;
}
</script>
<style>
.container-page {
  position: relative;
  width: 100%;
  padding: 0;
}
.v-image__image--contain {
  background-position-y: 38% !important;
}
@media only screen and (max-width: 600px) {
  .v-window__prev,
  .v-window__next {
    top: calc(60% - 40px) !important;
  }
}
.login100-form-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 40px;
  background-color: #f1cabb;
  border-radius: 10px;
  font-size: 16px;
  color: #fff;
  line-height: 1.2;
  transition: all 0.4s;
  position: relative;
  z-index: 1;
}
</style>
