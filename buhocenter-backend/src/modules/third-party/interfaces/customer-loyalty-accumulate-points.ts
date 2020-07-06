import { CustomerLoyaltyActions } from '../enums/customer-loyalty-actions.enum';
import { CustomerLoyaltyItems } from './customer-loyalty-items';

export interface CustomerLoyaltyAccumulatePoints {
    apiKey: string;
    type: CustomerLoyaltyActions;
    products: CustomerLoyaltyItems[];
}
