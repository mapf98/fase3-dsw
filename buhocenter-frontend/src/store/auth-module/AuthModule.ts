import { Module } from 'vuex';
import AuthTypes from '@/store/auth-module/methods/auth-methods';
import AuthRepository from '@/modules/auth-module/repositories/auth.repository';
import {ClientResponse} from "@/store/auth-module/interfaces/ClientResponse";

const authModule: Module<any, any> = {
    namespaced: true,
    state: {
        err_auth: false,
        err_message: '',
        token_google: '',
        client: {},
    },
    getters: {
        [AuthTypes.getters.GET_AUTH_TOKEN_GOOGLE](state): string {
            return state.token_google;
        },
    },
    mutations: {
        [AuthTypes.mutations.AUTH_GOOGLE_SUCCESS](state, data: { token: string, data: ClientResponse} ) {
            state.token_google = data.token;
            state.client = data.data;
            state.err_auth = false;
            state.err_message = '';
        },
        [AuthTypes.mutations.AUTH_ERR](state, data: {status: number, error: string}) {
            state.err_auth = true;
            state.err_message = data.error;
        },
    },
    actions: {
         async [AuthTypes.actions.LOGIN_WITH_GOOGLE]({ commit }): Promise<boolean>{
             try {
                 const response = await AuthRepository.loginWithGoogle();
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
    },
}

export default authModule;