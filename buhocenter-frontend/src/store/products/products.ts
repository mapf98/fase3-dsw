import { Module } from 'vuex';
import {
    FETCH_PRODUCTS,
    FETCH_PRODUCT_PHOTO_BY_NAME,
    SET_PRODUCT_PHOTOS_NOT_LOADED,
} from './methods/products.actions';
import {
    SET_PRODUCTS,
    SET_PRODUCT_AND_PHOTOS_LOADED,
    SET_TOTAL_PRODUCTS,
} from './methods/products.mutations';
import {
    GET_PRODUCTS,
    GET_PRODUCTS_AND_PHOTOS_LOADED,
    GET_TOTAL_PRODUCTS,
} from './methods/products.getters';
import productsHttpRepository from '@/modules/products/http-repositories/products-http.repository';
import productsFirebaseRepository from '@/modules/products/firebase-repositories/products-firebase.repository';

const products: Module<any, any> = {
    namespaced: true,
    state: {
        products: [],
        productsAndPhotosLoaded: false,
        totalProducts: 0,
    },
    getters: {
        [GET_PRODUCTS](state) {
            return state.products;
        },
        [GET_PRODUCTS_AND_PHOTOS_LOADED](state) {
            return state.productsAndPhotosLoaded;
        },
        [GET_TOTAL_PRODUCTS](state) {
            return state.totalProducts;
        },
    },
    mutations: {
        [SET_PRODUCTS](state, products): void {
            state.products = products;
        },
        [SET_PRODUCT_AND_PHOTOS_LOADED](state, loaded: boolean): void {
            state.productsAndPhotosLoaded = loaded;
        },
        [SET_TOTAL_PRODUCTS](state, total: number): void {
            state.totalProducts = total;
        },
    },
    actions: {
        [SET_PRODUCT_PHOTOS_NOT_LOADED]({ commit }, loaded: boolean): void {
            commit(SET_PRODUCT_AND_PHOTOS_LOADED, loaded);
        },
        async [FETCH_PRODUCTS]({ commit }, { page, catalogueId }): Promise<boolean> {
            try {
                const products = await productsHttpRepository.getProducts(page, catalogueId);
                commit(SET_PRODUCTS, products[0]);
                commit(SET_TOTAL_PRODUCTS, products[1]);
                return true;
            } catch (e) {
                return false;
            }
        },
        async [FETCH_PRODUCT_PHOTO_BY_NAME]({ commit }, products): Promise<boolean | any> {
            try {
                for await (const element of products) {
                    const principalPhoto: string = element.productPhotos[0].content;
                    const photos = await productsFirebaseRepository.getProductPhotoByName(element.id, principalPhoto);
                    element.imageUrl = photos;
                }
                commit(SET_PRODUCTS, products);
                commit(SET_PRODUCT_AND_PHOTOS_LOADED, true);
            } catch (e) {
                return false;
            }
        },
    },
};

export default products;
