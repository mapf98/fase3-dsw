import httpClient from './http-client';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export class HttpRepository {

    protected createUri(
        path: string[],
        queryString?: Object | any
    ): string {
        let uri: string = '';

        if (path) {
            uri += '/' + path.join('/');
        }

        if (queryString) {
            uri += '?';
            const query: string[] = [];

            for (const [key, value] of Object.entries(queryString)) {
                query.push(`${key}=${value}`);
            }

            uri += query.join('&');
        }

        return uri;
    }

    protected post(uri: string,
        data: AxiosRequestConfig['data'],
        header: AxiosRequestConfig['headers'],
    ): Promise<AxiosResponse<any>> {
        return httpClient.post(uri, data, header);
    }

    protected get(uri: string): Promise<AxiosResponse<any>> {
        return httpClient.get(uri);
    }

    protected patch(uri: string,
        data: AxiosRequestConfig['data'],
        header: AxiosRequestConfig['headers']
    ): Promise<AxiosResponse<any>> {
        return httpClient.patch(uri, data, header);
    }

    protected delete(uri: string, header: AxiosRequestConfig['headers']): Promise<AxiosResponse<any>> {
        return httpClient.delete(uri, header);
    }
}