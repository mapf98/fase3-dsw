import httpClient from './http-client';
import { AxiosRequestConfig } from 'axios';

export class HttpRepository {

    protected createUri(
        path: string[],
        queryString: Object | any
    ) {
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
    ) {
        return httpClient.post(uri, data, header);
    }

    protected get(uri: string): any {
        return httpClient.get(uri);
    }

    protected patch(uri: string,
        data: AxiosRequestConfig['data'],
        header: AxiosRequestConfig['headers']
    ) {
        return httpClient.patch(uri, data, header);
    }

    protected delete(uri: string, header: AxiosRequestConfig['headers']) {
        return httpClient.delete(uri, header);
    }
}