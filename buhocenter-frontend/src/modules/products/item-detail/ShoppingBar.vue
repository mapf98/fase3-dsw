<template>
  <v-container class="ma-0">
    <v-navigation-drawer
        fixed
        right
        clipped
        bottom
        permanent
        mobile-break-point="0"
        ref="navigationDrawer"
        class="pa-0 mt-5"
        :width="$vuetify.breakpoint.smAndDown ? '90px' : '300px'"
    >
        <v-container style="margin-top: 60px">
            <v-form ref="form">
                <v-select
                    :x-small="$vuetify.breakpoint.mdAndDown"
                    small
                    color="white"
                    v-model="quantity"
                    :items="quantityValues"
                    label="Qty"
                    persistent-hint
                ></v-select>
            </v-form>
        </v-container>
        <v-container class="overline mt-5 d-flex justify-center">
            <v-btn @click="addToCart()" block outlined color="primary" :x-small="$vuetify.breakpoint.mdAndDown">
                <v-icon left class="d-flex align-center">mdi-cart-outline</v-icon>
                <p class="ma-0 d-none d-lg-block">Agregar al carrito</p>
            </v-btn>
        </v-container>
        <v-container class="overline mt-3 d-flex justify-center">
            <v-btn @click="buyItem()" block outlined color="primary" :x-small="$vuetify.breakpoint.mdAndDown">
                <v-icon left class="d-flex align-center">mdi-play-box-outline</v-icon>
                <p class="ma-0 d-none d-lg-block">Comprar ahora</p>
            </v-btn>
        </v-container>
        <v-divider></v-divider>
        <v-container class="overline mt-3 justify-center">
            <v-icon small color="black"> mdi-map-marker-outline </v-icon>
            Entrega a: Caracas, Venezuela
        </v-container>
        <v-divider></v-divider>
        <SocialIcons/>
    </v-navigation-drawer>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Emit, Prop, Component, Watch } from 'vue-property-decorator';
import { PropSync } from "vue-property-decorator";
import { carts, authModule, products } from "../../../store/namespaces";
import {
    GET_ITEM_DETAIL,
} from '../../../store/products/methods/products.getters';
import AuthTypes from '../../../store/auth-module/methods/auth-methods';
import * as CART_INTERFACE from '../interfaces/carts.interface';
import SocialIcons from '../../social/SocialIcons.vue';

@Component({
    components: {
        SocialIcons,
    },
})
export default class ShoppingBar extends Vue {
    quantity: number = 0;
    
    quantityValues: string[] = [
        '1', '2', '3', '4', '5', '6', '10', '11', '12', '13', '14', '15', '16', '17',
        '18', '19', '20', '21', '22', '23', '25', '26', '27', '28', '29', '30',
    ];

    $refs!: {
        form: any;
    };

    isProduct(): boolean {
        if (this.$route.query.item === 'product') {
            return true;
        }

        return false;
    }

    @Emit('buyItem')
    buyItem() {
        // TODO: Implementar checkout con la pasarela de pagos
    }

    @Emit('addToCart')
    async addToCart() {
        if (!this.GET_CLIENT_DATA.id) {
            return; // TODO: Disparar el modal de inicio de sesión
        } else {
            if (this.quantity === 0) {
                return;
            }

            this.$emit('addItemToCart', this.quantity);
        }
    }

    @products.Getter(GET_ITEM_DETAIL) private GET_ITEM_DETAIL;
    @authModule.Getter(AuthTypes.getters.GET_CLIENT_DATA) private GET_CLIENT_DATA;
}
</script>
<style scoped>
.social {
  text-decoration: none !important;
}
</style>