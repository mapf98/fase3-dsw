import { BrandInterface } from '../../brand/interfaces/brand.interface';
import { Catalogue } from '../../catalogues/interfaces/catalogues.interface';
import { Provider } from '../../provider/interfaces/provider.interface';
import { Status } from '@/modules/common/interfaces/status.interface';

export interface ProductCreate {
    id?: number;
    productName: string;
    description: string;
    price: number;
    shippingPrice: number;
    minimumQuantityAvailable: number;
    brand: {
        id: number;
    };
    provider: {
        id: number[];
    };
    category: {
        id: number;
    };
}

export interface ProductProvider {
    createdAt?: string;
    id: number;
    provider: Provider;
    updatedAt?: string;
}

export interface Product {
    productPhotos: any;
    description?: string;
    id?: number;
    brand?: BrandInterface;
    minimumQuantityAvailable?: number;
    name?: string;
    imageUrl?: string; // eliminar
    //revisar offer y offerss
    offer?: any;
    offers?: any;
    photos?: Array<{ content: string; imageUrl?: string }>;
    price?: number;
    productProvider?: ProductProvider[];
    serviceProvider?: ProductProvider[]; // ELIMINAR
    shippingPrice?: string;
    productDimensions?: ProductDimentions;
    status?: Status;
    provider: {
        createdAt: string;
        id: number;
        name: string;
        updatedAt: string;
    };
    productDimension: {
        width: string;
        height: string;
        long: string;
    };
    rating: string;
    questions?: Comment[];
    productInventories?: ProductInventorie;
    productCategories?: {
        createdAt?: string;
        id?: number;
        updatedAt?: string;
        productCatalogues?: {
            createdAt?: string;
            updatedAt?: string;
            id?: number;
            catalogue: Catalogue;
        }[];
    }[];
    productRatings?: ProductRating[];
    serviceRatings?: ProductRating[]; //Eliminar

    updatedAt?: string;
    createdAt?: string;
    quantity?: number;
    //quitar
    type?: number;
}

export interface ProductRating {
    rating?: number;
    total?: number;
}

export interface ProductDimentions {
    createdAt?: string;
    height?: string;
    id?: number;
    long?: string;
    updatedAt?: string;
    width?: string;
}

export interface Comment {
    comment: string;
    createdAt?: string;
    id: number;
    updatedAt?: string;
}

export interface ProductInventorie {
    availableQuantity: number;
    createdAt?: string;
    id: number;
    updatedAt?: string;
}

export interface InventoryProduct {
    quantity: number;
    product: {
        id: number;
    };
}

export interface dimensionDto {
    dimension: {
        width: number;
        height: number;
        long: number;
    };
    id: number;
}

export interface ProductPhotoDto {
    id: number;
    imageName: string;
}
