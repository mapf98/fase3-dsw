import { Test, TestingModule } from '@nestjs/testing';
import { CustomerLoyaltyService } from './customer-loyalty.service';
import { WinstonModule } from 'nest-winston';
import { LoggerSettingsService } from '../../settings/services/logger.service';
import { CustomerLoyaltyRepository } from '../repositories/customer-loyalty.repository';
import {forwardRef, HttpModule} from '@nestjs/common';
import { ConfigService } from '../../../config/config.service';
import { AuthService } from '../../auth/services/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { repositoryMockFactory } from '../../../../test/mock.functions';
import {JwtModule, JwtService} from '@nestjs/jwt';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { CsvGenerator } from '../../documents/repositories/csv.generator';
import { PetromilesClientsCsv } from '../../documents/infraestructure/csv/petromiles-clients.csv';
import {UsersService} from '../../users/services/users.service';
import {EmailsService} from '../../notifications/services/emails.service';

describe('customer loyalty service', () => {
    let service: CustomerLoyaltyService;

    beforeEach(async () => {
        process.env.JWT_SECRET = 'key4test';
        process.env.JWT_EXPIRES_IN = '60s';
        process.env.SENDGRID_API_KEY = 'SG.NONE';
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                EmailsService,
                AuthService,
                CustomerLoyaltyService,
                ConfigService,
                {
                    provide: CustomerLoyaltyRepository,
                    useClass: CustomerLoyaltyRepository,
                },
                {
                    provide: getRepositoryToken(User),
                    useFactory: repositoryMockFactory,
                },
                {
                    provide: CsvGenerator,
                    useClass: PetromilesClientsCsv,
                },
            ],
            imports: [
                HttpModule,
                SendGridModule.forRoot({
                    apikey: process.env.SENDGRID_API_KEY,
                }),
                WinstonModule.forRootAsync({
                    useClass: LoggerSettingsService,
                }),
                JwtModule.registerAsync({
                    useFactory: async () => ({
                        secret: process.env.JWT_SECRET,
                        signOptions: {
                            expiresIn: process.env.JWT_EXPIRES_IN,
                        },
                    }),
                }),
            ],
        }).compile();

        service = module.get<CustomerLoyaltyService>(CustomerLoyaltyService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
