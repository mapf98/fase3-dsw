export interface Address {
    id?: number;
    firstStreet?: string;
    secondStreet?: string;
    cityName?: string;
    state?: string;
    zipcode?: string;
    default?: boolean;
    user?: {
        id: number;
    };
    status?: {
        id: number;
    };
}
