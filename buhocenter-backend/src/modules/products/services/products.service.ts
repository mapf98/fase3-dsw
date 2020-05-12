import { createQueryBuilder, Repository} from 'typeorm'
import { Injectable, Inject} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from '../entities/product.entity'
import { Cart } from '../entities/cart.entity'
import { ProductCart } from '../entities/product-cart.entity'
import { Customer } from '../../users/entities/customer.entity'
import { ProductDTO } from '../dto/products.dto'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'
import { ProductRating } from '../entities/product-rating.entity';
import { STATUS } from '../../../config/constants';

@Injectable()
export class ProductsService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        @InjectRepository(ProductRating)
        private readonly productRatingsRepository: Repository<ProductRating>,
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(ProductCart)
        private readonly productCartRepository: Repository<ProductCart>,
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>
    ) {}

  	private async findCartUser(customerId: number): Promise<Cart> {
  		return await createQueryBuilder()
							    .select('carrito')
							    .addSelect('max("fecha_creacion")','newestTime')
							    .from(Cart,'carrito')
							    .where('carrito.cliente_id = :id', {id:customerId})
							    .addGroupBy('id')
							    .getOne();
	}

	private async createCart(findCustomer: Customer): Promise<Cart> {
        let newCart=  new Cart();
        newCart.name= new Date(Date.now());							
        newCart.customer=findCustomer;
        this.cartRepository.save(newCart);	
        return newCart;
	}



    public async asociateProductCart(customerID: number, ProductRes: ProductDTO): Promise<any>{
        let findCustomer = await this.customerRepository.findOne({id :customerID});
        let findProduct  = await this.productsRepository.findOne({id: ProductRes.id});					
        let FindCartNewest = await this.findCartUser(customerID);

        if(FindCartNewest){
            let numero= FindCartNewest.id;
            let product_cart3= await this.productCartRepository.findOne({where:{ numero } });
            let newProduct_cart=new ProductCart();
            let findCArt=  createQueryBuilder()
                                .select()
                                .where('carrito.id= :id', {id:FindCartNewest.id})
                                .from(Cart,'carrito')
                                .addGroupBy('id')
                                .getOne();
                                    newProduct_cart.quantity=ProductRes.quantity;				  			
                                    newProduct_cart.cart=FindCartNewest;
                                    newProduct_cart.product=findProduct;								  		
                                    this.productCartRepository.save(newProduct_cart);
        } else {
                        let newCart= await this.createCart(findCustomer);								
                        let newProduct_cart=new ProductCart();
                        newProduct_cart.quantity=ProductRes.quantity;
                        newProduct_cart.product=findProduct;
                        newProduct_cart.cart=newCart;				  	
                        this.productCartRepository.save(newProduct_cart);
                        this.logger.debug(`asociateProductCart: ([customerID=${customerID}|ProductRes=${ProductRes}])`, { context: ProductsService.name });
        }
  	  	return "Producto asociado al carrito exitosamente!";
  }



    private async getProductAverageRating(products: Product[]): Promise<void> {
        for await (const product of products) {
            product.productRatings = await this.productRatingsRepository.query(`
                SELECT ROUND(AVG(CP.calificacion)) as rating
                FROM calificacion_producto CP
                WHERE CP.producto_id = ${product.id}
            `.trim())

            this.logger.debug(`getProductAverageRating [id=${product.id}|productRatings=${
                JSON.stringify(product.productRatings)}]`);
        }
    }

    public async getProducts(page: number = 1, catalogueId: number = 1): Promise<[Product[], number]> {
        this.logger.debug(`getProducts: [page=${page}|catalogueId=${catalogueId}]`, { context: ProductsService.name });
        
        const take: number = 8;

        let [products, total]: [Product[], number] = await this.productsRepository.findAndCount({
            where: `catalogue.id = ${catalogueId} AND status.id = ${STATUS.ACTIVE.id}`,
            join: {
                alias: 'products',
                innerJoinAndSelect: {
                    productPhotos: 'products.productPhotos',
                    provider: 'products.provider',
                    productCategories: 'products.productCategories',
                    productCatalogues: 'productCategories.productCatalogues',
                    catalogue: 'productCatalogues.catalogue',
                    status: 'products.status'
                },
            },
            order: {
                id: 'ASC',
            },
            skip: take * (page - 1),
            take,
        });

        await this.getProductAverageRating(products);

        return [products, total];
    }

}
