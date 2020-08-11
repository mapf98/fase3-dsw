import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WinstonModule } from 'nest-winston';

import { Provider } from '../entities/provider.entity';
import { ProvidersService } from '../services/providers.service';
import { LoggerSettingsService } from '../../settings/services/logger.service';

describe('Providers Service', () => {

  let providersService: ProvidersService;
  let RepositoryMock: jest.Mock;
  let providerRepository : Repository<Provider>;

  beforeEach(() => {
    RepositoryMock = jest.fn(() => ({
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      query: jest.fn(),
    }));     
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        WinstonModule.forRootAsync({
          useClass: LoggerSettingsService,
        }),
      ],
      providers: [
        ProvidersService,
        {
          provide: getRepositoryToken(Provider),
          useClass: RepositoryMock,
        },
      ]
    }).compile();

    providersService = module.get<ProvidersService>(ProvidersService);
    providerRepository = module.get(getRepositoryToken(Provider));
  });

  describe('getProvider(providerId)', () => {
    let expectedProvider;
    let providerId;
    let result;
    
    describe('case: success', () => {
        beforeEach(async () => {
          
          providerId = 1;
          expectedProvider =  {
            id: 1,
            createdAt: '2020-08-06T21:24:48.375Z',
            updatedAt: '2020-08-06T21:24:48.375Z',
            name: 'Apple Products'
        };

          (providerRepository.findOne as jest.Mock).mockResolvedValue(
            expectedProvider,
          );

          result = await providersService.getProvider(providerId);
        });

      it('should invoke providerRepository.findOne()', () => {
          expect(providerRepository.findOne).toHaveBeenCalledTimes(1);
          expect(providerRepository.findOne).toHaveBeenCalledWith(providerId);
      });

      it('should return the provider found by id', () => {
          expect(result).toStrictEqual(expectedProvider);
      });
    });

    describe('case: failure', () => {
      describe('When either provider id is undefined or does not exists', () => {
        beforeEach(async () => {
    
          providerId = undefined;
    
          (providerRepository.findOne as jest.Mock).mockImplementation(
            ()=> {
              throw new Error('Error finding the provider');
            },
          );
        });

        it('should throw an error while finding the provider', () => {
          const result = async () => await providersService.getProvider(providerId);
          expect(providerRepository.findOne)
          .toThrow(new Error('Error finding the provider'));
        });
      });
    });
  });

  
  describe('getAllProviders()', () => {
    let expectedProviders;
    let result;
    
    describe('case: success', () => {
        beforeEach(async () => {
          
          expectedProviders =  [{
            id: 1,
            createdAt: '2020-08-06T21:24:48.375Z',
            updatedAt: '2020-08-06T21:24:48.375Z',
            name: 'Apple Products'
        }];

          (providerRepository.find as jest.Mock).mockResolvedValue(
            expectedProviders,
          );

          result = await providersService.getAllProviders();
        });

      it('should return the list of providers', () => {
          expect(result).toStrictEqual(expectedProviders);
      });
    });

    describe('case: failure', () => {
      describe('When some unexpected error occurs', () => {
        beforeEach(async () => {
        
          (providerRepository.find as jest.Mock).mockImplementation(
            ()=> {
              throw new Error('Error finding the list of providers');
            },
          );
        });

        it('should throw an error while finding the list of providers', () => {
          const result = async () => await providersService.getAllProviders();
          expect(providerRepository.find)
          .toThrow(new Error('Error finding the list of providers'));
        });
      });
    });
  });
})

