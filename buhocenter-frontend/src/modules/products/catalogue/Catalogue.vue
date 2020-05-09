<template>
    <div>
        <Aside>
            <ProductCard/>
            <v-container>
                <v-pagination
                    color="#b1c2e3"
                    circle
                    v-model="page"
                    :length="getLength"
                    :total-visible="7"
                ></v-pagination>
            </v-container>
        </Aside>
        <v-snackbar
            v-model="errorLoadingContent" top :timeout="timeout" color="error"
        >
            Ocurrió un error obteniendo los productos, por favor intente nuevamente
            <v-btn color="white" text @click="closeSnackbar">Cerrar</v-btn>
        </v-snackbar>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from "vue-class-component";
import ProductCard from './ProductCard.vue';
import Aside from './Aside.vue';
import { products, layout } from "../../../store/namespaces";
import {
    FETCH_PRODUCTS,
    FETCH_PRODUCT_PHOTO_BY_NAME,
    SET_PRODUCT_PHOTOS_NOT_LOADED,
} from '../../../store/products/methods/products.actions';
import {
    GET_CATEGORY, GET_CATALOGUE_ID,
} from '../../../store/layout/methods/layout.getters';
import {
    GET_PRODUCTS,
    GET_TOTAL_PRODUCTS,
} from '../../../store/products/methods/products.getters';
import { Watch } from "vue-property-decorator";

@Component({
    components: {
        ProductCard,
        Aside,
    },
})
export default class Catalogue extends Vue {
    page: number = 1;
    productsDisplayed: number = 8;
    timeout: number = 5000;
    errorLoadingContent: boolean = false;

    @Watch('page')
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
        const fetched: boolean = await this.FETCH_PRODUCTS({ page: this.page, catalogueId: this.GET_CATALOGUE_ID });

        if (!fetched) {
            this.errorLoadingContent = true;
        } else {
            await this.FETCH_PRODUCT_PHOTO_BY_NAME(this.GET_PRODUCTS);
        }
    }

    async mounted() {
        await this.fetchProducts();
    }

    @products.Action(FETCH_PRODUCTS) private FETCH_PRODUCTS;
    @products.Action(FETCH_PRODUCT_PHOTO_BY_NAME) private FETCH_PRODUCT_PHOTO_BY_NAME;
    @products.Action(SET_PRODUCT_PHOTOS_NOT_LOADED) private SET_PRODUCT_PHOTOS_NOT_LOADED;
    @products.Getter(GET_PRODUCTS) private GET_PRODUCTS;
    @products.Getter(GET_TOTAL_PRODUCTS) private GET_TOTAL_PRODUCTS;
    @layout.Getter(GET_CATALOGUE_ID) private GET_CATALOGUE_ID;
}
</script>
