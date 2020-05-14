import { Module } from 'vuex';
import {
    FETCH_PRODUCTS,
    FETCH_PRODUCT_PHOTO_BY_NAME,
    SET_PRODUCT_PHOTOS_NOT_LOADED,
    FETCH_PRODUCT_DETAIL,
    FETCH_SERVICE_DETAIL,
    FETCH_PRODUCT_PHOTOS,
    FETCH_SERVICE_PHOTOS,
    FETCH_PRODUCT_ITEM_PHOTOS,
    FETCH_SERVICE_ITEM_PHOTOS,
} from './methods/products.actions';
import {
    SET_PRODUCTS,
    SET_ITEM_DETAIL,
    SET_PRODUCT_AND_PHOTOS_LOADED,
    SET_TOTAL_PRODUCTS,
} from './methods/products.mutations';
import {
    GET_PRODUCTS,
    GET_PRODUCTS_AND_PHOTOS_LOADED,
    GET_TOTAL_PRODUCTS,
    GET_ITEM_DETAIL,
} from './methods/products.getters';
import productsHttpRepository from '@/modules/products/http-repositories/products-http.repository';
import servicesHttpRepository from '@/modules/products/http-repositories/services-http.repository';
import productsFirebaseRepository from '@/modules/products/firebase-repositories/products-firebase.repository';
import servicesFirebaseRepository from '@/modules/products/firebase-repositories/services-firebase.repository';
import { ITEM_TYPE } from '@/config/constants';

const products: Module<any, any> = {
    namespaced: true,
    state: {
        products: [],
        productsAndPhotosLoaded: false,
        totalProducts: 0,
        itemDetail: {},
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
        [GET_ITEM_DETAIL](state) {
            return state.itemDetail;
        },
    },
    mutations: {
        [SET_ITEM_DETAIL](state, item): void {
            state.itemDetail = item;
        },
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
        async [FETCH_PRODUCT_DETAIL]({ commit }, productId: number): Promise<boolean> {
            try {
                const itemDetail = await productsHttpRepository.getProductById(productId);
                commit(SET_ITEM_DETAIL, itemDetail);
                return true;
            } catch (e) {
                return false;
            }
        },
        async [FETCH_SERVICE_DETAIL]({ commit }, productId: number): Promise<boolean> {
            try {
                const itemDetail = await servicesHttpRepository.getServiceById(productId);
                commit(SET_ITEM_DETAIL, itemDetail);
                return true;
            } catch (e) {
                return false;
            }
        },
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
        async [FETCH_PRODUCT_ITEM_PHOTOS]({ commit }, { itemId, item }): Promise<boolean> {
            try {
                for await (const element of item.photos) {
                    element.imageUrl = await productsFirebaseRepository.getProductPhotoByName(itemId, element.content);
                }
                commit(SET_ITEM_DETAIL, item);
                return true;
            } catch (e) {
                return false;
            }
        },
        async [FETCH_SERVICE_ITEM_PHOTOS]({ commit }, { itemId, item }): Promise<boolean> {
            try {
                for await (const element of item.photos) {
                    element.imageUrl = await servicesFirebaseRepository.getServicePhotoByName(itemId, element.content);
                }
                commit(SET_ITEM_DETAIL, item);
                return true;
            } catch (e) {
                return false;
            }
        },
        async [FETCH_PRODUCT_PHOTO_BY_NAME]({ commit }, products): Promise<boolean | any> {
            try {
                for await (const element of products) {
                    element.type = ITEM_TYPE.PRODUCT;
                    const principalPhoto: string = element.photos[0].content;
                    const photo = await productsFirebaseRepository.getProductPhotoByName(element.id, principalPhoto);
                    element.imageUrl = photo;
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
