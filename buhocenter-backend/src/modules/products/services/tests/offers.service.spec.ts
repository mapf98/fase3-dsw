import { OffersService } from '../offers.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Offer } from '../../entities/offer.entity';
import { repositoryMockFactory, MockFunctionInterface } from '../../../../../test/mock.functions';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OffersRO } from '../../interfaces/offers';
import { OfferDto } from '../../dto/offers.dto';
import { WinstonModule } from 'nest-winston';
import { LoggerSettingsService } from '../../../settings/services/logger.service';
import { StatusService } from '../../../status/services/status.service';
import { STATUS } from '../../../../../src/config/constants';
import { offerMockDB, createOffer, responseCreate } from './mocks/offers.mock';

describe('OffersService', () => {
    let service: OffersService;
    let offersRepository: Repository<Offer>;
    let statusService: StatusService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OffersService,
                {
                    provide: getRepositoryToken(Offer),
                    useFactory: repositoryMockFactory,
                },

                {
                    provide: StatusService,
                    useFactory: repositoryMockFactory,
                },
            ],
            imports: [
                WinstonModule.forRootAsync({
                    useClass: LoggerSettingsService,
                }),
            ],
        }).compile();
        statusService = module.get<StatusService>(StatusService);
        service = module.get<OffersService>(OffersService);
        offersRepository = module.get(getRepositoryToken(Offer));
    });

    describe('get all offers', () => {
        it('should get all offers', async () => {
            offersRepository.findAndCount = jest.fn().mockResolvedValue([offerMockDB, 2]);
            const response: OffersRO = await service.getOffers(0, 2);
            expect(response).toEqual({ offers: offerMockDB, quantity: 2 });
        });
        it('if not found must return an empty array', async () => {
            offersRepository.findAndCount = jest.fn().mockReturnValue([[], 0]);
            let response = await service.getOffers(0, 3);
            expect(response).toEqual({ offers: [], quantity: 0 });
        });
        it('if an error ocurrs finding the offers must return undefined', async () => {
            offersRepository.findAndCount = jest.fn().mockImplementation(() => {
                throw new Error('Error getting the offers');
            });
            expect(await service.getOffers(0, 3)).toBeUndefined();
            expect(await service.getOffers(undefined, undefined)).toBeUndefined();
            expect(offersRepository.findAndCount).toThrow(new Error('Error getting the offers'));
        });
    });

    describe('create an offer', () => {
        let transactions;

        beforeEach(() => {
            transactions = {
                getRepository() {
                    return offersRepository;
                },
            };
        });
        it('must try to save an offer', async () => {
            statusService.getStatusById = jest.fn().mockResolvedValue(STATUS.ACTIVE.id);
            transactions.save = jest.fn().mockResolvedValue(responseCreate);
            let response = await service.createOffer(createOffer, transactions);
            expect(transactions.save).toHaveBeenCalledWith({
                name: 'Nueva oferta',
                description: 'descripcion',
                percentage: 10,
                status: 1,
            });
            //expect(response).toEqual(responseCreate);
        });
        it('if an offer can not be inserted, an error must occur', async () => {
            const offer: OfferDto = {
                name: undefined,
                description: 'descripcion',
                percentage: 10,
            };
            statusService.getStatusById = jest.fn().mockResolvedValue(STATUS.ACTIVE.id);
            transactions.save = jest.fn().mockImplementation(() => {
                throw new Error('Error inserting');
            });
            await service.createOffer(offer, transactions);
            expect(transactions.save).toThrow(new Error('Error inserting'));
            //expect(response).toEqual(offer)
        });
    });

    describe('delete an offer', () => {
        let transactions;
        beforeEach(() => {
            transactions = {
                getRepository() {
                    return offersRepository;
                },
            };
        });
        xit('should change the status of an offer to 2', async () => {
            offersRepository.findOne = jest.fn().mockResolvedValue(offerMockDB[0]);
            let response = await service.deleteOffer(1, transactions);
            expect(await offersRepository.update).toBeCalled();
            expect(response).toBeTruthy();
        });
        it('if cannot find the offer, must return false', async () => {
            offersRepository.findOne = jest.fn().mockResolvedValue(undefined);
            expect(await service.deleteOffer(4444, transactions)).toBeFalsy();
        });
        it('if an error occurs , must return false an throw exception', async () => {
            offersRepository.findOne = jest.fn().mockImplementation(() => {
                throw new Error('Error finding the offer');
            });
            expect(await service.deleteOffer(2, transactions)).toBeFalsy();
            expect(offersRepository.findOne).toThrow(new Error('Error finding the offer'));
        });
    });
});
