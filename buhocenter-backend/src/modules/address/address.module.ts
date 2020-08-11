import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from './controllers/address.controller';
import { AddressService } from './services/address.service';
import { Address } from './entities/address.entity';
import { UsersModule } from '../users/users.module';
import { StatusModule } from '../status/status.module';
import { AddressValidationRepository } from './repositories/address.repository';
import { AddressTransactionsRepository } from './transaction/address.transactions.service';
import { AddressSubscriber } from './services/address-subscriber.service';
import { EncryptionsModule } from '../encryptions/encryptions.module';
import { AuditModule } from '../audit/audit.module';

@Module({
    imports: [TypeOrmModule.forFeature([Address]), AuditModule, HttpModule, UsersModule, StatusModule, EncryptionsModule],
    controllers: [AddressController],
    providers: [
        AddressService,
        AddressValidationRepository,
        AddressTransactionsRepository,
        AddressSubscriber,
    ],
    exports: [AddressService],
})
export class AddressModule {}
