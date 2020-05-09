export default {
    mutations: {
        AUTH_GOOGLE_SUCCESS: 'AUTH_GOOGLE_SUCCESS',
        AUTH_ERR: 'AUTH_ERR',
        LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    },
    getters: {
        GET_AUTH_TOKEN: 'GET_AUTH_TOKEN',
        GET_ERR_MESSAGES: 'GET_ERR_MESSAGES',
        GET_ERR_AUTH: 'GET_ERR_AUTH',
        GET_CLIENT_DATA: 'GET_CLIENT_DATA',
    },
    actions: {
        LOGIN_SOCIAL: 'LOGIN_SOCIAL',
        LOGOUT : 'LOGOUT',
    },
}