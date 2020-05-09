<template>
  <div style="margin-top: 50px">
    <transition-group name="fade" class="row ma-1" tag="div">
        <div v-for="item in GET_PRODUCTS" class="col-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-3 pb-3" :key="item.id">
            <v-col v-if="GET_PRODUCTS_AND_PHOTOS_LOADED" class="pa-3 pointer">
                <div class='justify-center'>
                    <v-row class="mx-auto py-2" justify='center'>
                        <img class="justify-center"
                            :height="$vuetify.breakpoint.mdAndUp ? '115' : '50'"
                            :src="item.imageUrl"
                            alt="Product Image"
                        >
                    </v-row>
                    <v-row class="card-body overline">
                        <h3 class="d-inline-block text-truncate body-2 font-weight-regular mx-auto">{{ item.name }}</h3>
                    </v-row>
                    <v-row class="overline">
                        <p class="d-inline-block text-truncate mx-auto ma-0">por {{ item.provider.name }}</p>
                    </v-row>
                    <v-row class="d-flex align-center">
                        <v-rating
                            class="mx-auto"
                            :value="getRating(item.productRatings)"
                            background-color="orange lighten-3"
                            color="orange"
                            :small="$vuetify.breakpoint.mdAndUp"
                            :x-small="$vuetify.breakpoint.mdAndDown"
                            readonly
                            :size="$vuetify.breakpoint.mdAndDown ? '3' : '30'"
                            :dense="$vuetify.breakpoint.mdAndDown"
                            half-increments
                        ></v-rating>
                    </v-row>
                    <v-row class="overline">
                        <p class="mx-auto subtitle-1">${{ item.price }}</p>
                    </v-row>
                </div>
            </v-col>
        </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { products } from "../../../store/namespaces";
import {
    GET_PRODUCTS,
    GET_PRODUCTS_AND_PHOTOS_LOADED,
} from '../../../store/products/methods/products.getters';
import {
    FETCH_PRODUCTS,
    FETCH_PRODUCT_PHOTO_BY_NAME,
    SET_PRODUCT_PHOTOS_NOT_LOADED,
} from '../../../store/products/methods/products.actions';

@Component
export default class ProductCard extends Vue {
    contentLoaded: boolean = false;
    rating: number = 2;

    get getProducts() {
        return this.GET_PRODUCTS;
    }

    get getProductPhotosLoaded() {
        return this.GET_PRODUCTS_AND_PHOTOS_LOADED;
    }

    getRating(productRatings): number {
        return productRatings[0] ? productRatings[0].rating : 0;
    }

    @products.Action(FETCH_PRODUCTS) FETCH_PRODUCTS;
    @products.Action(FETCH_PRODUCT_PHOTO_BY_NAME) FETCH_PRODUCT_PHOTO_BY_NAME;
    @products.Getter(GET_PRODUCTS) GET_PRODUCTS;
    @products.Getter(GET_PRODUCTS_AND_PHOTOS_LOADED) GET_PRODUCTS_AND_PHOTOS_LOADED;
}
</script>
<style scoped lang="scss">
.pointer {
    cursor: pointer;
}
.fade-move {
  transition: transform 1s;
}
.card {
  transition: 500ms;
  position: relative;
  overflow: hidden;
}
.card img {
  z-index: 1;
}
.card button {
  width: 140px;
  margin-bottom: 10px;
}
.card:hover img {
  filter: blur(4px);
}
.card:hover .overlay {
  opacity: 0.8;

}
.card .overlay {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
  background-color: #232b34;
  opacity: 0;
  z-index: 100;
  transition: all 0.3s ease-in;
}
.card:hover, .card:active {
  transform: scaleY(1.1) scaleX(1.06);
  box-shadow: 0 14px 98px rgba(0, 0, 0, 0.25), 0 0px 60px rgba(0, 0, 0, 0.22);
}
</style>
