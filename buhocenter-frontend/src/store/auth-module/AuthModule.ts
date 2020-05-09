import { Module } from 'vuex';
import AuthTypes from '@/store/auth-module/methods/auth-methods';
import AuthRepository from '@/modules/auth-module/repositories/auth.repository';
import {ClientResponse} from "@/store/auth-module/interfaces/ClientResponse";

const authModule: Module<any, any> = {
    namespaced: true,
    state: {
        err_auth: false,
        err_message: '',
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
        }
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
            }else{
                state.err_message = "Error al iniciar sesión, Verifique que esta ingresando con el metodo con el que se registro inicialmente."
            }
        },
        [AuthTypes.mutations.LOGOUT_SUCCESS](state) {
            state.token = '';
            state.err_message = '';
            state.client = {};
            state.err_auth = false;
        },
    },
    actions: {
         async [AuthTypes.actions.LOGIN_SOCIAL]({ commit }, social: string): Promise<boolean>{
             try {
                 const response = await AuthRepository.loginWithSocial(social);
                 console.log("epa response")
                 console.log(response)
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
        async [AuthTypes.actions.LOGOUT]({ commit, state }): Promise<boolean>{
            try {
                commit(AuthTypes.mutations.LOGOUT_SUCCESS);
                const response = await AuthRepository.logout( state.client.uid );
                if ( response ) {
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