import { Module } from 'vuex';
import CartTypes from '@/store/carts/methods/cart-methods';
import cartsHttpRepository from '@/modules/products/http-repositories/carts-http.repository';
import * as CART_INTERFACE from '@/modules/products/interfaces/carts.interface';

const carts: Module<any, any> = {
    namespaced: true,
    state: {
        err_cart: false,
        err_cart_message: '',
        cart: {},
        checkout: [],
    },
    mutations: {
        [CartTypes.mutations.SET_CART](state, data: Response) {
            // @ts-ignore
            state.cart = data.cart;
            state.checkout  = [];
            state.err_cart = false;
            state.err_cart_message = '';
        },
        [CartTypes.mutations.ADD_PRODUCT_CHECKOUT](state, productCart: any) {
            const newCheckout = state.checkout;
            newCheckout.push(productCart);
            state.checkout = newCheckout;
        },
        [CartTypes.mutations.REMOVE_PRODUCT_CHECKOUT](state, index: number) {
            const newCheckout = state.checkout;
            newCheckout.splice(index, 1);
            state.checkout = newCheckout;
        },
        // tslint:disable-next-line:max-line-length
        [CartTypes.mutations.SET_QUANTITY_PRODUCT](state, data: { quantity: number; inCheckout: boolean; index_checkout: number, index: number}) {
            var new_cart = state.cart;
            new_cart.productCarts[data.index].quantity = data.quantity;
            if (data.inCheckout) {
                var new_checkout = state.checkout;
                new_checkout[data.index_checkout].quantity = data.quantity;
                state.checkout = new_checkout;
            }
            state.cart = new_cart;
        },
        [CartTypes.mutations.REMOVE_PRODUCT_CART](state, index: number) {
            let new_cart = state.cart;
            new_cart.productCarts.splice(index, 1);
            state.cart = new_cart;
        },
    },
    getters: {
        [CartTypes.getters.GET_CART_OBJECT](state): string {
            return state.cart;
        },
        [CartTypes.getters.GET_PRODUCTS_CHECKOUT](state): number[] {
            return state.checkout;
        },
        [CartTypes.getters.GET_TOTAL_PRICE_CHECKOUT](state): number {
            const {checkout} = state;
            let price = 0;
            checkout.map((productCart) => {
                const {product} = productCart;
                const {quantity} = productCart;
                if (product.offer) {
                    price += parseFloat(product.offer.discountPrice) * quantity;
                } else {
                    price += parseFloat(product.price) * quantity;
                }
            });
            return price;
        },
    },
    actions: {
        async [CartTypes.actions.ADD_PRODUCT_TO_CART]({ commit }, productCart: CART_INTERFACE.ProductCart): Promise<boolean> {
            try {
                await cartsHttpRepository.addProductToCart(productCart);
                return true;
            } catch (e) {
                return false;
            }
        },
        async [CartTypes.actions.ADD_SERVICE_TO_CART]({ commit }, serviceCart: CART_INTERFACE.ServiceCart): Promise<boolean> {
            try {
                await cartsHttpRepository.addServiceToCart(serviceCart);
                return true;
            } catch (e) {
                return false;
            }
        },
        async [CartTypes.actions.GET_ITEMS_CARS]({ commit }, clientId: number): Promise<boolean> {
            try {
                const response = await cartsHttpRepository.getItemsCars(clientId);
                if (response) {
                    commit(CartTypes.mutations.SET_CART, response);
                    return true;
                }
                return false;
            } catch (e) {
                return false;
            }
        },
        async [CartTypes.actions.DELETE_PRODUCT_CART]({ commit }, data: {productCartId: number, index: number}): Promise<boolean> {
            try {
                const response = await cartsHttpRepository.deleteProductCart(data.productCartId);
                console.log(response)
                if (response) {
                    commit(CartTypes.mutations.REMOVE_PRODUCT_CART, data.index);
                    return true;
                }
                return false;
            } catch (e) {
                return false;
            }
        },
    },
};

export default carts;
