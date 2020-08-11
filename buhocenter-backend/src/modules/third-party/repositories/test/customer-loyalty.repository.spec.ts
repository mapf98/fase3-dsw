import { Test, TestingModule } from '@nestjs/testing';
import {HttpModule, HttpStatus} from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggerSettingsService } from '../../../settings/services/logger.service';
import { ReadStream } from 'fs';
import { sendMock } from '../../../documents/infraestructure/test/mocks/send.mock';
import { ConfigModule } from '../../../../config/config.module';
import { PetromilesClientsCsv } from '../../../documents/infraestructure/csv/petromiles-clients.csv';
import { CustomerLoyaltyRepository } from '../customer-loyalty.repository';
import {MockServer} from '@teamjourney/api-mock-server';

describe('customer loyalty repository', () => {
    let petromiles: CustomerLoyaltyRepository;
    let file: ReadStream;
    let server: MockServer;
    beforeAll(async () => {
        file = new PetromilesClientsCsv().generate(sendMock);
        server = new MockServer();
        await server.start(3500);
    });
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CustomerLoyaltyRepository],
            imports: [
                ConfigModule,
                HttpModule,
                WinstonModule.forRootAsync({
                    useClass: LoggerSettingsService,
                }),
            ],
        }).compile();
        petromiles = module.get(CustomerLoyaltyRepository);
    });

    describe('should create a file in the petromiles server', () => {
        it('send a csv to server', async () => {
            server.mock({
                path: '/third-party-clients/csv-check',
                method: 'POST',
            },
            {
                body: {
                    data: sendMock,
                },
            },
        );
            const response = await petromiles.sendClientsCsv(file);
            expect(response).toBeDefined();
        });
    });

    afterAll(() => {
        server.stop();
    });
});
