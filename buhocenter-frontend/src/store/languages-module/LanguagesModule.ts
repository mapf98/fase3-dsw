import { Module } from 'vuex';
import LanguageTypes from '@/store/languages-module/methods/language-methos';
import LanguageRepository from '@/modules/languages-module/repositories/language.repository';
import {LanguageResponse} from '@/store/languages-module/interfaces/LanguageResponse';

const languageModule: Module<any, any> = {
    namespaced: true,
    state: {
        err_languages: false,
        language_selected: '',
        languages: [],
    },
    getters: {
        [LanguageTypes.getters.GET_LANGUAGES](state): any[] {
            return state.languages;
        },
        [LanguageTypes.getters.GET_LANGUAGE_ERR](state): boolean {
            return state.err_languages;
        },
    },
    mutations: {
        [LanguageTypes.mutations.GET_LANGUAGES_SUCCESS](state, data: { data: LanguageResponse} ) {
            state.languages = data.data;
            state.err_languages = false;
        },
        [LanguageTypes.mutations.LANGUAGE_ERR](state) {
            state.err_languages = true;
        },
    },
    actions: {
        async [LanguageTypes.actions.API_GET_LANGUAGES]({ commit }): Promise<any>{
            try {
                const response = await LanguageRepository.getLanguages();
                if ( !response.error  ) {
                    commit(LanguageTypes.mutations.GET_LANGUAGES_SUCCESS, response);
                    return true;
                }
                commit(LanguageTypes.mutations.LANGUAGE_ERR, response.error);
                return false;
            } catch (e) {
                commit(LanguageTypes.mutations.LANGUAGE_ERR, {});
                return false;
            }
        },
    },
};

export default languageModule;