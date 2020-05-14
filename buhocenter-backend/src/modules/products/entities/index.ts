import { Brand } from './brand.entity';
import { Cart } from './cart.entity';
import { Catalogue } from './catalogue.entity';
import { Category } from './category.entity';
import { Offer } from './offer.entity';
import { ProductCart } from './product-cart.entity';
import { ProductCatalogue } from './product-catalogue.entity';
import { ProductCategory } from './product-category.entity';
import { ProductDimension } from './product-dimension.entity';
import { ProductInventory } from './product-inventory.entity';
import { ProductOffer } from './product-offer.entity';
import { ProductPhoto } from './product-photo.entity';
import { Product } from './product.entity';
import { ProductRating } from './product-rating.entity';
import { ProductQuestion } from './product-question.entity';
import { ServiceRating } from './service-rating.entity';
import { ServiceQuestion } from './service-question.entity';
import { ProductProvider } from './product-provider.entity';
import { ServiceCart } from './service-cart.entity';
import { ServiceCatalogue } from './service-catalogue.entity';
import { ServiceCategory } from './service-category.entity';
import { ServiceOffer } from './service-offer.entity';
import { Service } from './service.entity';
import { Customer } from '../../users/entities/customer.entity';    // FIX
import { ServiceProvider } from './service-provider.entity';
import { ServicePhoto } from './service-photo.entity';

export const productEntities = [
    Brand,
    Cart,
    Catalogue,
    Category,
    Customer,
    Offer,
    ProductCart,
    ProductCatalogue,
    ProductCategory,
    ProductDimension,
    ProductInventory,
    ProductOffer,
    ProductPhoto,
    ProductRating,
    ProductQuestion,
    Product,
    ProductProvider,
    ServiceCart,
    ServiceCatalogue,
    ServiceCategory,
    ServiceOffer,
    ServicePhoto,
    ServiceProvider,
    ServiceRating,
    ServiceQuestion,
    Service,
]