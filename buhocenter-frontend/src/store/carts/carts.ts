import { Module } from 'vuex';
import {
    ADD_PRODUCT_TO_CART,
    ADD_SERVICE_TO_CART,
} from './methods/carts.actions';
import cartsHttpRepository from '@/modules/products/http-repositories/carts-http.repository';
import * as CART_INTERFACE from "@/modules/products/interfaces/carts.interface";

const carts: Module<any, any> = {
    namespaced: true,
    actions: {
        async [ADD_PRODUCT_TO_CART]({ commit }, productCart: CART_INTERFACE.ProductCart): Promise<boolean> {
            try {
                await cartsHttpRepository.addProductToCart(productCart);
                return true;
            } catch (e) {
                return false;
            }
        },
        async [ADD_SERVICE_TO_CART]({ commit }, serviceCart: CART_INTERFACE.ServiceCart): Promise<boolean> {
            try {
                await cartsHttpRepository.addServiceToCart(serviceCart);
                return true;
            } catch (e) {
                return false;
            }
        }
    },
};

export default carts;