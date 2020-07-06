import { Test, TestingModule } from '@nestjs/testing';
import { CustomerLoyaltyService } from './customer-loyalty.service';
import {WinstonModule} from 'nest-winston';
import {LoggerSettingsService} from '../../settings/services/logger.service';
import {CustomerLoyaltyRepository} from '../repositories/customer-loyalty.repository';
import {HttpModule} from '@nestjs/common';

describe('CustomerLoyaltyService', () => {
    let service: CustomerLoyaltyService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CustomerLoyaltyService, CustomerLoyaltyRepository],
            imports: [
                HttpModule,
                WinstonModule.forRootAsync({
                useClass: LoggerSettingsService,
            })],
        }).compile();

        service = module.get<CustomerLoyaltyService>(CustomerLoyaltyService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
