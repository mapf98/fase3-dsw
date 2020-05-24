<template>
        <v-container>
                <v-list-item v-for="(item,i) in GET_CART_OBJECT.productCarts" :key="item.id" class="mb-4">
                        <ProductCart :item="item" :index="i"></ProductCart>
                </v-list-item>
                <v-list-item>
                        <v-card
                                margin="0px"
                        >
                                <v-card-actions>
                                        Subtotal({{GET_PRODUCTS_CHECKOUT.length}} items):{{" "}}<b>{{GET_TOTAL_PRICE_CHECKOUT.toFixed(2)}}$</b>
                                </v-card-actions>
                                <v-card-actions>
                                        <v-btn  color="primary" outlined class="btn-remove" outlined >Proceed to checkout</v-btn>
                                </v-card-actions>
                        </v-card>
                </v-list-item>
        </v-container>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import {authModule, carts} from "@/store/namespaces";
    import ProductCart from "@/modules/cart-module/components/ProductCart.vue";
    import AuthMethods from "@/store/auth-module/methods/auth-methods";
    import CartMethods from "@/store/carts/methods/cart-methods"
    @Component({
            components: {ProductCart},
    })
    export default class Cart extends Vue {

            async mounted(){
                    if(this.GET_AUTH_TOKEN !== ''){
                        await this.GET_ITEMS_CARS(this.GET_CLIENT_DATA.id);
                    }
            }



            @authModule.Getter(AuthMethods.getters.GET_AUTH_TOKEN) GET_AUTH_TOKEN;
            @authModule.Getter(AuthMethods.getters.GET_CLIENT_DATA) GET_CLIENT_DATA;

            @carts.Action(CartMethods.actions.GET_ITEMS_CARS) GET_ITEMS_CARS;
            @carts.Getter(CartMethods.getters.GET_CART_OBJECT) GET_CART_OBJECT;
            @carts.Getter(CartMethods.getters.GET_PRODUCTS_CHECKOUT) GET_PRODUCTS_CHECKOUT;
            @carts.Getter(CartMethods.getters.GET_TOTAL_PRICE_CHECKOUT) GET_TOTAL_PRICE_CHECKOUT;

    }
</script>

<style>
        .btn-remove{
                height: 30px !important;
        }
</style>

