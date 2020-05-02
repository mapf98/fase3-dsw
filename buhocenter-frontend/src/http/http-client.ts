import axios, { AxiosInstance } from 'axios';

const baseDomain: string = process.env.VUE_APP_BUHOCENTER_URL;
const apiPrefix: string = process.env.VUE_APP_BUHOCENTER_API_PREFIX;
const port: number = process.env.VUE_APP_BUHOCENTER_PORT;

// Modificar el baseURL con las variables de ambiente
const httpClient: AxiosInstance = axios.create({
    baseURL: `http://localhost:3000`,
    timeout: 5000,
});

httpClient.interceptors.response.use((response) => response.data);

export default httpClient;