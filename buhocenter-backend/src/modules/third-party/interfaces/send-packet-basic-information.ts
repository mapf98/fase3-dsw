import { User } from '../../users/entities/user.entity';
import { Cart } from '../../carts/entities/cart.entity';
import { Address } from '../../address/entities/address.entity';

export interface SendPacketBasicInformation {
    user: User;
    carts: Cart[];
    address: Address;
}
