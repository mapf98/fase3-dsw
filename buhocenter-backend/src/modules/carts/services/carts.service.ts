import { createQueryBuilder, Repository} from 'typeorm'
import { Injectable, Inject} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from '../../products/entities/product.entity'
import { Cart } from '../entities/cart.entity'
import { ProductCart } from '../entities/product-cart.entity'
import { Customer } from '../../users/entities/customer.entity'
import { CartProductDTO } from '../dto/cartProduct.dto'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'
import { STATUS } from '../../../config/constants';
import { ProductsService } from '../../products/services/products.service'
import { UsersService } from '../../users/services/Users.service'
import { StatusService } from '../../status/services/status.service'
import { CartServiceDTO } from '../dto/cartService.dto'
import { ServiceCart } from '../entities/service-cart.entity'
import { ServicesService } from '../../services/services/services.service'
import { Service } from '../../services/entities/service.entity'
import { Status } from '../../Status/entities/status.entity'


@Injectable()
export class CartsService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(ProductCart)
        private readonly productCartRepository: Repository<ProductCart>,
        @InjectRepository(ServiceCart)
        private serviceCartRepository: Repository<ServiceCart>,
        @Inject(ProductsService)
        private readonly ProductsService: ProductsService,
        @Inject(UsersService)
        private readonly UsersService: UsersService,
        @Inject(StatusService)
        private readonly StatusService: StatusService,  
        @Inject(ServicesService)
        private readonly ServicesService:ServicesService,      
    ) {}

 private async findCartUser(customerId: number): Promise<Cart> {
        this.logger.debug(`findCartUser: [customerId = ${customerId}]`, { context: CartsService.name });  

          return await createQueryBuilder()
            .select('carrito')
            .from(Cart, 'carrito')
            .where('carrito.cliente_id = :customerId', { customerId })
            .andWhere('carrito.estatus_id = :statusId',{ statusId: STATUS.ACTIVE.id })
            .getOne();        
    }

	private async createCart(findCustomer: Customer): Promise<Cart> {
        let active = await this.StatusService.getStatus(STATUS.ACTIVE.id);
        let newCart = new Cart();						
        newCart.customer = findCustomer;
        newCart.status = active;
        await this.cartRepository.save(newCart);	
        await this.logger.debug(`createCart:carrito creado ([findCustomer = ${JSON.stringify(findCustomer)}`,
             { context: CartsService.name });

        return newCart;
	}

    private async createProductCart(cart: Cart, product:Product,quantity:number){
        let newProductCart: ProductCart = new ProductCart();
        newProductCart.quantity = quantity;                              
        newProductCart.cart = cart;
        newProductCart.product = product;                                          
        await this.productCartRepository.save(newProductCart);
        this.logger.debug(`createProductCart: relacion producto carrito guardada([cart = ${JSON.stringify(cart)}|product = ${JSON.stringify(product)}|quantity = ${quantity}])`,
            { context: CartsService.name });
    }
    
    /**
    *asocia un producto a el carrito del cliente
    *@params ProductRes, contiene los datos del producto
    *@returns un string que indica si el carrito fue asociado
    */
    public async asociateProductCart( ProductRes: CartProductDTO): Promise<string>{
        this.logger.debug(`asociateProductCart:Producto asociado  al carrito exitosamente ([ProductRes = ${JSON.stringify(ProductRes)}])`,
            { context: CartsService.name });

        let findCustomer: Customer = await this.UsersService.findUser(ProductRes.customer.id);    
        let findProduct: Product = await this.ProductsService.findProduct(ProductRes.product.id);				
        let findCartNewest: Cart = await this.findCartUser(ProductRes.customer.id);
        if(findCartNewest)
        {
             this.createProductCart(findCartNewest,findProduct,ProductRes.quantity);                                  
        } else {
            let newCart: Cart = await this.createCart(findCustomer);											  	                        
            this.createProductCart( newCart,findProduct,ProductRes.quantity);          
        }

  	  	return "Producto asociado al carrito exitosamente!";
   }



    private async createServiceCart(CustomerCart: Cart, Service, quantity:number){
        let newServiceCart: ServiceCart = new ServiceCart();
        newServiceCart.quantity = quantity;                            
        newServiceCart.cart = CustomerCart;
        newServiceCart.service = Service;
        await this.serviceCartRepository.save(newServiceCart);
    }

    async asociateServiceCart( ServiceRes: CartServiceDTO): Promise<string> {
        this.logger.debug(`asociateServiceCart: ([ServiceRes = ${JSON.stringify(ServiceRes)}])`,
            {context: CartsService.name});

        let findCustomer: Customer  = await this.UsersService.findUser(ServiceRes.customer.id);     
        let findService: Service  = await this.ServicesService.findService(ServiceRes.service.id);    
        let findCartNewest: Cart = await this.findCartUser(ServiceRes.customer.id);

        if(findCartNewest) {    
            await this.createServiceCart(findCartNewest,findService,ServiceRes.quantity);
        } else {    
            let newCart: Cart = await this.createCart(findCustomer);        
            await this.createServiceCart(newCart,findService,
                ServiceRes.quantity);            
        }

        this.logger.debug(`asociateServiceCart: ([ServiceRes = ${JSON.stringify(ServiceRes)}])`,
            {context: CartsService.name});

        return "servicio asociado al carrito exitosamente!";
    }
    
}

