import { Checkout } from './checkout.entity';
import { CryptocurrencyGateway } from './cryptocurrency-gateway.entity';
import { CryptocurrencyType } from './cryptocurrency-type.entity';
import { Payment } from './payment.entity';

export const purchasesEntities = [
    Checkout,
    CryptocurrencyGateway,
    CryptocurrencyType,
    Payment,
]