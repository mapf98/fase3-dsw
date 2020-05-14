import { Module } from 'vuex';
import AuthTypes from '@/store/auth-module/methods/auth-methods';
import AuthRepository from '@/modules/auth-module/repositories/auth.repository';
import {ClientResponse} from '@/store/auth-module/interfaces/ClientResponse';
import {CustomerInterface} from '@/modules/auth-module/interfaces/CustomertInterface';

const authModule: Module<any, any> = {
    namespaced: true,
    state: {
        err_auth: false,
        err_message: '',
        err_register: false,
        err_register_message: '',
        token: '',
        client: {},
    },
    getters: {
        [AuthTypes.getters.GET_AUTH_TOKEN](state): string {
            return state.token;
        },
        [AuthTypes.getters.GET_ERR_MESSAGES](state): string {
            return state.err_message;
        },
        [AuthTypes.getters.GET_ERR_AUTH](state): boolean {
            return state.err_auth;
        },
        [AuthTypes.getters.GET_CLIENT_DATA](state): {any} {
            return state.client;
        },
        [AuthTypes.getters.GET_ERR_REGISTER](state): boolean {
            return  state.err_register;
        },
        [AuthTypes.getters.GET_ERR_REGISTER_MESSAGES](state): string {
            return  state.err_register_message;
        },
    },
    mutations: {
        [AuthTypes.mutations.AUTH_GOOGLE_SUCCESS](state, data: { token: string, data: ClientResponse} ) {
            state.token = data.token;
            state.client = data.data;
            state.err_auth = false;
            state.err_message = '';
        },
        [AuthTypes.mutations.AUTH_ERR](state, data: {status: number, error: string}) {
            state.err_auth = true;
            if (data) {
                state.err_message = data.error;
            } else {
                state.err_message = 'An unexpected error occurred';
            }
        },
        [AuthTypes.mutations.LOGOUT_SUCCESS](state) {
            state.token = '';
            state.err_message = '';
            state.client = {};
            state.err_auth = false;
        },
        [AuthTypes.mutations.REGISTER_SUCCESS](state) {
            state.err_register = false;
            state.err_register_message = '';
        },
        [AuthTypes.mutations.REGISTER_ERR](state, error: string) {
            state.err_register = true;
            state.err_register_message = error;
        },
    },
    actions: {
        async [AuthTypes.actions.REGISTER_CUSTOMER]({ commit }, customer: CustomerInterface): Promise<any>{
            try {
                const response = await AuthRepository.registerCustomer(customer);
                if ( !response.error  ) {
                    commit(AuthTypes.mutations.REGISTER_SUCCESS, response);
                    return true;
                }
                commit(AuthTypes.mutations.REGISTER_ERR, response.error);
                return false;
            } catch (e) {
                return false;
            }
        },
        async [AuthTypes.actions.LOGIN_SOCIAL]({ commit }, social: string): Promise<boolean>{
            try {
                const response = await AuthRepository.loginWithSocial(social);
                //  console.log("epa response")
                //  console.log(response)
                if ( response ) {
                    commit(AuthTypes.mutations.AUTH_GOOGLE_SUCCESS, response);
                    return true;
                }
                commit(AuthTypes.mutations.AUTH_ERR, response);
                return false;
            } catch (e) {
                return false;
            }
        },
        async [AuthTypes.actions.LOGIN]({ commit }, data: {email: string; password: string }): Promise<boolean> {
            try {
                const response = await AuthRepository.login(data.email, data.password);

                if ( response && ! response.hasOwnProperty('error') ) {
                    commit(AuthTypes.mutations.AUTH_GOOGLE_SUCCESS, response);
                    return true;
                }
                commit(AuthTypes.mutations.AUTH_ERR, response);
                return false;
            } catch (e) {
                return false;
            }
        },
        async [AuthTypes.actions.LOGOUT]({ commit, state }): Promise<boolean>{
            try {
                const response = await AuthRepository.logout( state.client.uid );
                commit(AuthTypes.mutations.LOGOUT_SUCCESS);
                return false;
            } catch (e) {
                return false;
            }
        },
    },
}

export default authModule;