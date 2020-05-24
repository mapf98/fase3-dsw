<template>
    <v-container class="mt-5" style="max-width: none !important;background: #ffffff; ">
        <v-row>
            <v-col cols="12" lg="9" md="8" sm="12">
                <v-container fluid class="mt-5" style="max-width: none !important; width: 100%; ">
                    <v-row>
                        <v-col cols="12"
                            offset-lg="1"
                            offset-md="1"
                            offset-sm="0"
                            col-lg="10"
                            col-md="10"
                            col-sm="12"
                        >
                            <p class="overline font-weight-light caption" style="word-break: break-word;">
                                <RouterLink :to="`/catalogues?category_id=${GET_CATEGORY_ID}`"> {{ GET_CATEGORY }} </RouterLink>> <RouterLink :to="`/products?category_id=${GET_CATEGORY_ID}&catalogue_id=${GET_CATALOGUE_ID}`"> {{ GET_CATALOGUE }} </RouterLink>
                            </p>
                        </v-col>
                    </v-row>
                    <v-row v-if="itemDetailLoaded" class="pa-0">
                        <v-col cols="12" lg="1" md="1" sm="2" class="justify-center ma-0">
                            <div v-for="photo in GET_ITEM_DETAIL.photos"
                                   :key="photo.imageUrl">
                                <v-img
                                    class="justify-center my-2 pa-0"
                                    alt="Image"
                                    contain
                                    :height="$vuetify.breakpoint.mdAndUp ? '50' : '50'"
                                    :width="$vuetify.breakpoint.mdAndUp ? '50' : '50'"
                                    :src="photo.imageUrl"
                                    @click="changePhotoSelected(photo.imageUrl)"
                                    :style="imageSelected === photo.imageUrl ? 'border: 1px solid #c4c3c0;' : ''"
                                ></v-img>
                            </div>
                        </v-col>
                        <v-col  col="12" lg="6"  md="5" sm="8" class="mx-auto d-flex justify-center">
                            <v-img
                                class="justify-center image-product"
                                alt="Image"
                                contain
                                :src="imageSelected"
                            ></v-img>
                        </v-col>
                        <v-col cols="12" sm="12" class="d-xs-flex d-sm-flex d-md-none d-lg-none">
                            <v-row>
                                <v-row fill-width class="pa-1 mx-auto">
                                    <v-select
                                        small
                                        color="white"
                                        v-model="quantity"
                                        :items="quantityValues"
                                        label="Qty"
                                        persistent-hint
                                    ></v-select>
                                </v-row>
                                <v-row fill-width class="pa-1 mx-auto">
                                    <v-btn @click="addItemToCart(quantity)" block outlined color="primary" style="height: 50px" >
                                        <v-icon left class="d-flex align-center">mdi-cart-outline</v-icon>
                                        <p class="ma-0 ">Agregar al carrito</p>
                                    </v-btn>
                                </v-row>
                                <v-row fill-width class="pa-1 mx-auto">
                                    <v-btn @click="buyItem(quantity)" block outlined color="primary" style="height: 50px" >
                                        <v-icon left class="d-flex align-center">mdi-play-box-outline</v-icon>
                                        <p class="ma-0">Comprar ahora</p>
                                    </v-btn>
                                </v-row>
                            </v-row>
                        </v-col>
                        <v-col col="12" lg="5" md="4" sm="12" class="d-none d-lg-block">
                            <ItemDescription/>
                        </v-col>
                    </v-row>
                    <v-row class="mx-auto d-lg-none">
                        <ItemDescription/>
                    </v-row>
                    <v-divider></v-divider>
                    <v-container v-if="itemDetailLoaded" class="mr-3 my-2" style="max-width: none !important; width: 100%;">
                        <h3 class="my-3">Questions and Answers</h3>
                        <v-row class="mx-auto my-3 d-flex"
                               v-for="question of GET_ITEM_DETAIL.questions" :key="question.id"
                        >
                            <v-col cols="10">
                                {{ question.comment }}
                                <div class="overline">
                                    {{ getDate(question.createdAt) }}
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-container>
            </v-col>
            <v-col cols="12" lg="3" md="4" class="d-none d-md-flex d-lg-flex">
                <ShoppingBar
                    @addItemToCart="addItemToCart"
                    @buyItem="buyItem"
                />
            </v-col>
            <DailyRecomendation></DailyRecomendation>
        </v-row>
        <v-snackbar v-model="itemAddedToCart" top :timeout="timeout" color="success">
            {{ isProduct() ? 'Producto' : 'Servicio' }} añadido al carrito exitosamente
            <v-btn color="white" text @click="itemAddedToCart = false">Cerrar</v-btn>
        </v-snackbar>
        <v-snackbar v-model="errorAddingItemToCart" top :timeout="timeout" color="error">
            Ocurrió un error añadiendo el {{ isProduct() ? 'producto' : 'servicio' }} al carrito
            <v-btn color="white" text @click="errorAddingItemToCart = false">Cerrar</v-btn>
        </v-snackbar>
        <v-snackbar v-model="errorLoadingContent" top :timeout="timeout" color="error">
            Ocurrió un error obteniendo los productos, por favor intente nuevamente
            <v-btn color="white" text @click="closeSnackbar">Cerrar</v-btn>
        </v-snackbar>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { layout, products, authModule, carts } from "../../../store/namespaces";
import CartMethods from '@/store/carts/methods/cart-methods'
import {
    GET_CATEGORY,
    GET_CATALOGUE, GET_CATEGORY_ID, GET_CATALOGUE_ID,
} from '../../../store/layout/methods/layout.getters';
import {
    FETCH_PRODUCTS,
    FETCH_PRODUCT_PHOTO_BY_NAME,
    SET_PRODUCT_PHOTOS_NOT_LOADED,
    FETCH_PRODUCT_DETAIL,
    FETCH_SERVICE_DETAIL,
    FETCH_PRODUCT_ITEM_PHOTOS,
    FETCH_SERVICE_ITEM_PHOTOS,
} from '../../../store/products/methods/products.actions';
import {
    GET_ITEM_DETAIL,
} from '../../../store/products/methods/products.getters';
import { getDate } from '../../../utils/date-functions';
import ShoppingBar from './ShoppingBar.vue';
import ItemDescription from './ItemDescription.vue';
import SocialIcons from '../../social/SocialIcons.vue';
import AuthTypes from '../../../store/auth-module/methods/auth-methods';
import * as CART_INTERFACE from '../interfaces/carts.interface';
import DailyRecomendation from "@/modules/products/daily-recomendation/DailyRecomendation.vue";

@Component({
    components: {
        DailyRecomendation,
        ShoppingBar,
        ItemDescription,
        SocialIcons,
    },
    methods: {
        getDate,
    },
})
export default class ItemDetail extends Vue {
    principalImage: string = '';
    quantityValues: string[] = [
        '1', '2', '3', '4', '5', '6', '10', '11', '12', '13', '14', '15', '16', '17',
        '18', '19', '20', '21', '22', '23', '25', '26', '27', '28', '29', '30',
    ];
    quantity: number = 0;

    itemDetailLoaded: boolean = false;
    errorLoadingContent: boolean = false;
    errorAddingItemToCart: boolean = false;
    itemAddedToCart: boolean = false;
    timeout: number = 5000;

    buyItem(quantity: number) {
        // TODO: Implementar checkout con la pasarela de pagos
    }

    private async addProductToCart() {
        const productCart: CART_INTERFACE.ProductCart = {
            quantity: this.quantity,
            customer: {
                id: this.GET_CLIENT_DATA.id,
            },
            product: {
                id: this.GET_ITEM_DETAIL.id,
            },
        };

        return await this.ADD_PRODUCT_TO_CART(productCart);
    };

    private async addServiceToCart() {
        const serviceCart: CART_INTERFACE.ServiceCart = {
            quantity: this.quantity,
            customer: {
                id: this.GET_CLIENT_DATA.id,
            },
            service: {
                id: this.GET_ITEM_DETAIL.id,
            },
        };

        return await this.ADD_SERVICE_TO_CART(serviceCart);
    };

    async addItemToCart(quantity: number) {
        let created: boolean;

        this.quantity = quantity;

        if (this.isProduct()) {
            created = await this.addProductToCart();
        } else {
            created = await this.addServiceToCart();
        }

        if (created) {
            this.itemAddedToCart = true;
            await this.GET_ITEMS_CARS(this.GET_CLIENT_DATA.id);

        } else {
            this.errorAddingItemToCart = true;
        }
    }

    isProduct(): boolean {
        if (this.$route.query.item === 'product') {
            return true;
        }

        return false;
    }

    itemQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    get imageSelected(): string {
        return this.principalImage;
    }

    changePhotoSelected(imageUrl: string): void {
        this.principalImage = imageUrl;
    }

    closeSnackbar() {
        this.errorLoadingContent = false;
    }

    async mounted() {
        let fetched: boolean = false;
        let photosLoaded: boolean = false;

        if (this.isProduct()) {
            fetched = await this.FETCH_PRODUCT_DETAIL(this.$route.query.id);
        } else {
            fetched = await this.FETCH_SERVICE_DETAIL(this.$route.query.id);
        }

        if (fetched) {
            if (this.isProduct()) {
                photosLoaded = await this.FETCH_PRODUCT_ITEM_PHOTOS({ itemId: this.GET_ITEM_DETAIL.id, item: this.GET_ITEM_DETAIL });
            } else {
                photosLoaded = await this.FETCH_SERVICE_ITEM_PHOTOS({ itemId: this.GET_ITEM_DETAIL.id, item: this.GET_ITEM_DETAIL });
            }
            
            this.principalImage = this.GET_ITEM_DETAIL.photos[0].imageUrl;
        } else {
            this.errorLoadingContent = true;
        }

        if (fetched && photosLoaded) {
            this.itemDetailLoaded = true;
        }
    }

    @carts.Action(CartMethods.actions.ADD_PRODUCT_TO_CART) private ADD_PRODUCT_TO_CART;
    @carts.Action(CartMethods.actions.ADD_SERVICE_TO_CART) private ADD_SERVICE_TO_CART;
    @carts.Action(CartMethods.actions.GET_ITEMS_CARS) GET_ITEMS_CARS;

    @products.Getter(GET_ITEM_DETAIL) private GET_ITEM_DETAIL;
    @products.Action(FETCH_PRODUCT_ITEM_PHOTOS) private FETCH_PRODUCT_ITEM_PHOTOS;
    @products.Action(FETCH_SERVICE_ITEM_PHOTOS) private FETCH_SERVICE_ITEM_PHOTOS;
    @products.Action(FETCH_SERVICE_DETAIL) private FETCH_SERVICE_DETAIL;
    @products.Action(FETCH_PRODUCT_DETAIL) private FETCH_PRODUCT_DETAIL;
    @layout.Getter(GET_CATEGORY) private GET_CATEGORY;
    @layout.Getter(GET_CATEGORY_ID) private GET_CATEGORY_ID;
    @layout.Getter(GET_CATALOGUE) private GET_CATALOGUE;
    @layout.Getter(GET_CATALOGUE_ID) private GET_CATALOGUE_ID;


    @authModule.Getter(AuthTypes.getters.GET_CLIENT_DATA) private GET_CLIENT_DATA;

}
</script>

<style scoped>

    .container-principal {
        top: 0px;
        background: #ffffff;
    }
.image-product{
    height: 450px;
    width: 420px;
}

.v-navigation-drawer--clipped:not(.v-navigation-drawer--temporary):not(.v-navigation-drawer--is-mobile) {
    width: auto !important;
}
</style>