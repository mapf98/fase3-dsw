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
    FETCH_PRODUCTS_DAILY_DETAIL,
    FETCH_PRODUCTS_DAILY,
    FETCH_PRODUCTS_DAILY_DETAIL_PHOTOS,
    SET_PRODUCTS_DAILY_PHOTOS_NOT_LOADED,
} from './methods/products.actions';
import {
    SET_PRODUCTS,
    SET_ITEM_DETAIL,
    SET_PRODUCT_AND_PHOTOS_LOADED,
    SET_TOTAL_PRODUCTS,
    SET_PRODUCT_DAILY_AND_PHOTOS_LOADED,
    SET_PRODUCTS_DAILY,
} from './methods/products.mutations';
import {
    GET_PRODUCTS,
    GET_PRODUCTS_AND_PHOTOS_LOADED,
    GET_TOTAL_PRODUCTS,
    GET_ITEM_DETAIL,
    GET_PRODUCTS_DAILY,
    GET_PRODUCTS_DAILY_AND_PHOTOS_LOADED,
} from './methods/products.getters';
import productsHttpRepository from '@/modules/products/http-repositories/products-http.repository';
import servicesHttpRepository from '@/modules/products/http-repositories/services-http.repository';
import productsFirebaseRepository from '@/modules/products/firebase-repositories/products-firebase.repository';
import servicesFirebaseRepository from '@/modules/products/firebase-repositories/services-firebase.repository';
import { ITEM_TYPE } from '@/config/constants';
import CategoryTypes from "@/store/category-module/methods/category-methods";
import categoriesFirebaseRepository from "@/modules/products/firebase-repositories/categories-firebase.repository";

const products: Module<any, any> = {
    namespaced: true,
    state: {
        products: [],
        productsAndPhotosLoaded: false,
        productsDaily: [],
        productsDailyAndPhotosLoaded: false,
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
        [GET_PRODUCTS](state) {
            return state.products;
        },
        [GET_PRODUCTS_DAILY](state) {
            return state.productsDaily;
        },
        [GET_PRODUCTS_DAILY_AND_PHOTOS_LOADED](state) {
            return state.productsDailyAndPhotosLoaded;
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
        [SET_PRODUCTS_DAILY](state, products): void {
            state.productsDaily = products;
        },
        [SET_PRODUCT_DAILY_AND_PHOTOS_LOADED](state, loaded: boolean): void {
            state.productsDailyAndPhotosLoaded = loaded;
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
        async [FETCH_PRODUCTS_DAILY]({ commit }): Promise<boolean> {
            try {
                // tslint:disable-next-line:no-shadowed-variable
                const products = await productsHttpRepository.getProductsDailyRecommendation();
                commit(SET_PRODUCTS_DAILY, products);
                return true;
            } catch (e) {
                return false;
            }
        },
        async [FETCH_PRODUCTS_DAILY_DETAIL_PHOTOS]({ commit }, products): Promise<boolean> {
            try {
                for (const product of products) {
                    // tslint:disable-next-line:max-line-length
                    product.photos[0] = await productsFirebaseRepository.getProductPhotoByName(product.id, product.photos[0].content );
                }
                commit(SET_PRODUCTS_DAILY, products);
                commit(SET_PRODUCT_DAILY_AND_PHOTOS_LOADED, true);
                return true;
            } catch (e) {
                return false;
            }
        },
    },
};

export default products;
