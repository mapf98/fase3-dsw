import { createQueryBuilder, Repository} from 'typeorm'
import { Injectable, Inject} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from '../../products/entities/product.entity'
import { Cart } from '../entities/cart.entity'
import { ProductCart } from '../entities/product-cart.entity'
import { Customer } from '../../users/entities/customer.entity'
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
        @Inject(UsersService)
        private readonly UsersService: UsersService,
        @Inject(StatusService)
        private readonly StatusService: StatusService,
        @Inject(ServicesService)
        private readonly ServicesService:ServicesService,
    ) {}

    private async findCartUser(customerId: number): Promise<Cart> {
        this.logger.debug(`findCartUser: buscando carrito del usuario ([customerId=${customerId}`,
        { context: CartsService.name });

        return await createQueryBuilder()
            .select('carrito')
            .from(Cart,'carrito')
            .where('carrito.cliente_id = :id', {id:customerId})
            .andWhere('carrito.estatus_id=:id',{id:STATUS.ACTIVE.id})
            .addGroupBy('id')
            .getOne();     
    }

    private async createCart(findCustomer: Customer): Promise<Cart> {
        this.logger.debug(`createCart: creando el carrito`);

        let active: Status = await this.StatusService.getStatus(STATUS.ACTIVE.id);
        let newCart = new Cart();
        newCart.name = new Date(Date.now());                            
        newCart.customer=findCustomer;
        newCart.status=active;
        await this.cartRepository.save(newCart);    

        return newCart;
    }

    private async createServiceCart(CustomerCart: Cart, Service, quantity:number){
        let newServiceCart: ServiceCart=new ServiceCart();
        newServiceCart.quantity=quantity;                            
        newServiceCart.cart=CustomerCart;
        newServiceCart.service=Service;
        await this.serviceCartRepository.save(newServiceCart);
    }

    async asociateServiceCart( ServiceRes: CartServiceDTO): Promise<string> {
        this.logger.debug(`asociateServiceCart: ([ServiceRes=${JSON.stringify(ServiceRes)}])`,
            {context: CartsService.name});

        let findCustomer: Customer = await this.UsersService.findUser(ServiceRes.customer.id);     
        let findService : Service =  await this.ServicesService.findService(ServiceRes.service.id);    
        let findCartNewest: Cart= await this.findCartUser(ServiceRes.customer.id);
        if(findCartNewest) {
            let findCart=  createQueryBuilder()
                .select()
                .where('carrito.id= :id', {id:findCartNewest.id})
                .from(Cart,'carrito')
                .addGroupBy('id')
                .getOne();

            await this.createServiceCart(findCartNewest,findService,ServiceRes.quantity);
        } else {    
            let newCart: Cart= await this.createCart(findCustomer);        
            await this.createServiceCart(newCart,findService,
                ServiceRes.quantity);            
        }

        this.logger.debug(`asociateServiceCart: ([ServiceRes=${JSON.stringify(ServiceRes)}])`,
            {context: CartsService.name});

        return "servicio asociado al carrito exitosamente!";
    }
    
}

