import { Module, HttpModule } from '@nestjs/common';
import { CustomerLoyaltyService } from './services/customer-loyalty.service';
import { CustomerLoyaltyRepository } from './repositories/customer-loyalty.repository';

@Module({
    imports: [HttpModule],
    providers: [CustomerLoyaltyService, CustomerLoyaltyRepository],
    exports: [CustomerLoyaltyService],
})
export class ThirdPartyModule {}
