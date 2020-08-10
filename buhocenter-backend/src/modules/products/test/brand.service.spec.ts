import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from '../services/brands.service';
import { WinstonModule } from 'nest-winston';
import { LoggerSettingsService } from '../../settings/services/logger.service';
import { Repository } from 'typeorm';
import { StatusService } from '../../status/services/status.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Brand } from '../entities/brand.entity';
import { repositoryMockFactory } from '../../../../test/mock.functions';
import { getAllBrandResponseMock, getBrandByIdResponseMock } from './mocks/brands.mock';

describe('BrandsService', () => {
  let service: BrandsService;
  let brandsRepository: Repository<Brand>;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        {
          provide: getRepositoryToken(Brand),
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
        })
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
    brandsRepository = module.get(getRepositoryToken(Brand));
  });

  describe('getAllBrands()', () => {
    it('should get all brands in database', async () => {
      brandsRepository.find = jest.fn().mockResolvedValue(getAllBrandResponseMock);
      const response = await service.getAllBrands();
      expect(response).toBe(getAllBrandResponseMock);
    });
  });

  describe('getBrand()', () => {
    it('should get a brand by ID in database', async () => {
      brandsRepository.findOne = jest.fn().mockResolvedValue(getBrandByIdResponseMock);
      const response = await service.getBrand(1);
      expect(response).toBe(getBrandByIdResponseMock);
      expect(response.id).toBe(getBrandByIdResponseMock.id);
    });
  });
});
