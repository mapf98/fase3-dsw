export default {
    mutations: {
        SET_CATALOGUES: 'SET_CATALOGUES',
        SET_ERR_CATALOGUE: 'SET_ERR_CATALOGUE',
        SET_ALL_CATALOGUES: 'SET_ALL_CATALOGUESC',
    },
    getters: {
        GET_CATALOGUES: 'GET_CATALOGUES',
        GET_ERR_CATALOGUE: 'GET_ERR_CATALOGUE',
        GET_FETCHED_CATALOGUE: 'GET_FETCHED_CATALOGUE',
    },
    actions: {
        FETCH_CATALOGUES: 'FETCH_CATALOGUES',
        FETCH_ALL_CATALOGUES: 'GET_ALL_CATALOGUES',
        SAVE_CATALOGUE: 'SAVE_CATALOGUE',
        DELETE_CATALOGUE: 'DELETE_CATALOGUE',
        CREATE_CATALOGUE: 'CREATE_CATALOGUE',
    },
};
