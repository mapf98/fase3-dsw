import { Module, HttpModule } from '@nestjs/common';
import { CustomerLoyaltyService } from './services/customer-loyalty.service';
import { CustomerLoyaltyRepository } from './repositories/customer-loyalty.repository';
import { ThirdPartyController } from './controllers/third-party.controller';
import { UsersModule } from '../users/users.module';
import { PetromilesClientsCsv } from '../documents/infraestructure/csv/petromiles-clients.csv';
import { ConfigModule } from '../../config/config.module';
import { CsvGenerator } from '../documents/repositories/csv.generator';

@Module({
    imports: [HttpModule, UsersModule, ConfigModule],
    providers: [
        CustomerLoyaltyService,
        CustomerLoyaltyRepository,
        {
            provide: CsvGenerator,
            useClass: PetromilesClientsCsv,
        },
    ],
    exports: [CustomerLoyaltyService],
    controllers: [ThirdPartyController],
})
export class ThirdPartyModule {}
