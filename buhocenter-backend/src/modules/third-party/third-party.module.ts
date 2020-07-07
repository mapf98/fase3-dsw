import { Module, HttpModule } from '@nestjs/common';
import { CustomerLoyaltyService } from './services/customer-loyalty.service';
import { CustomerLoyaltyRepository } from './repositories/customer-loyalty.repository';
import { ThirdPartyController } from './controllers/third-party.controller';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [HttpModule, UsersModule],
    providers: [CustomerLoyaltyService, CustomerLoyaltyRepository],
    exports: [CustomerLoyaltyService],
    controllers: [ThirdPartyController],
})
export class ThirdPartyModule {}
