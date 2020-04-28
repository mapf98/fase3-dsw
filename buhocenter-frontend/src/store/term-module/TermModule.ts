import { Module } from 'vuex';
import TermTypes from '@/store/term-module/methods/term-methods';
import TermModel from './models/TermModel';
import TermsRepository from '@/modules/term-module/repositories/terms.repository';

const termModule: Module<any, any> = {
    namespaced: true,
    state: {
        terms: [],
    },
    getters: {
        [TermTypes.getters.GET_TERMS](state): TermModel[] {
            return state.terms;
        },
    },
    mutations: {
        [TermTypes.mutations.TERMS_SUCCESS](state, terms) {
            state.terms = terms;
        },
    },
    actions: {
        async [TermTypes.actions.GET_TERMS_LANGUAGE]({ commit }, language: string): Promise<boolean> {
            try {
                const response = await TermsRepository.getTermsLanguage(language);
                commit(TermTypes.mutations.TERMS_SUCCESS, response.terms);
                return true;
            } catch (e) {
                return false;
            }
        },
    },
} 

export default termModule;