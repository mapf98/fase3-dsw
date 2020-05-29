import axios, { AxiosInstance } from 'axios';

// Modificar el baseURL con las variables de ambiente
const httpcustomer: AxiosInstance = axios.create({
    baseURL: `${process.env.VUE_APP_BUHOCENTER_URL}:${process.env.VUE_APP_BUHOCENTER_PORT}/api/v1`,
    timeout: 60000,
});

httpcustomer.interceptors.response.use((response) => response.data);

export default httpcustomer;