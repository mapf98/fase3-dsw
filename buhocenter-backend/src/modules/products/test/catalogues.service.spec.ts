import { Test, TestingModule } from '@nestjs/testing';
import { Catalogue } from '../entities/catalogue.entity';
import { Repository } from 'typeorm';
import { CataloguesService } from '../services/catalogues.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { LoggerSettingsService } from '../../settings/services/logger.service';
import { repositoryMockFactory } from '../../../../test/mock.functions';
import { StatusService } from '../../status/services/status.service';
import { catalogueMockDB, catalogueResponseMockDB, createCatalogueResponse } from './mocks/catalogues.mock';
import { Status } from '../../status/entities/status.entity';
import { STATUS } from '../../../config/constants';
import { async } from 'rxjs/internal/scheduler/async';
import { BadRequestException } from '@nestjs/common';

describe('cataloguesService', () => {
  let service: CataloguesService;
  let catalogueRepository: Repository<Catalogue>;
  let statusRepository: Repository<Status>;
  let statusService: StatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CataloguesService,
        {
          provide: getRepositoryToken(Catalogue),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Status),
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

    service = module.get<CataloguesService>(CataloguesService);
    catalogueRepository = module.get(getRepositoryToken(Catalogue));
    statusRepository = module.get(getRepositoryToken(Status));
    statusService = module.get<StatusService>(StatusService);

  });

  describe('getCatalogues()', () => {
    it('should get all catalogues in the database', async () => {
      const res = [{
        id: 1,
        date_creacion: '2020-08-07 10:53:51.238835',
        date_modificacion: '2020-08-07 10:53:51.238835',
        name: 'Computers',
        description: 'Catálogo de Computadoras',
        term: 'COMPUTERS',
        category_id: 1,
        status_id: 1,
      },
      {
        id: 2,
        date_creacion: '2020-08-07 10:53:51.238835',
        date_modificacion: '2020-08-07 10:53:51.238835',
        name: 'Smarthphones',
        description: 'Catálogo de smarthphones',
        term: 'SMARTPHONES',
        category_id: 1,
        status_id: 1,
      },
      ];

      catalogueRepository.find = jest.fn().mockResolvedValue(res);
      const response = await service.getCatalogues();
      expect(response).toEqual(res);
    });

    it ('must return error if not return catalogues', async () => {
      catalogueRepository.find = jest.fn().mockResolvedValue(undefined);
      const response = await service.getCatalogues();
      expect(response).toBeUndefined();
    });

  });

  describe('getCatalogueById()', () => {
    it ('should get a specific catalogue in the database', async () => {
      const res = [{
        id: 1,
        date_creacion: '2020-08-07 10:53:51.238835',
        date_modificacion: '2020-08-07 10:53:51.238835',
        name: 'Computers',
        description: 'Catálogo de Computadoras',
        term: 'COMPUTERS',
        category_id: 1,
        status_id: 1,
      }];

      catalogueRepository.findOne = jest.fn().mockResolvedValue(res);

      const response = await service.getCatalogueById(1);
      expect(response).toEqual(res);
    });

    it ('if not found, must return error', async () => {
      try {
        await service.getCatalogueById(9000000);
        fail('The catalogue is inactive or inaccessible');
      } catch ( e ) {
        expect(e.message.statusCode).toEqual(400);
        expect(e.message.message).toEqual('The catalogue is inactive or inaccessible');
      }
    });
  });

  describe('createCatalogue()', () => {
    it ('should create a catalogue', async () => {

      catalogueRepository.save = jest.fn().mockResolvedValue(catalogueResponseMockDB);

      const response = await service.createCatalogue(catalogueMockDB);
      expect(catalogueRepository.save).toHaveBeenCalledWith(catalogueMockDB);
      expect(response).toEqual(catalogueResponseMockDB);
    });

    it ('should return error if name is missing', async () => {
      try {
        await service.createCatalogue({
          name: '',
          description: 'Catálogo de Computadoras',
          term: 'COMPUTERS',
          category: {
            id: 1,
          },
          status: {
            id: 1,
          },
        } as Catalogue);
      } catch (e) {
        expect(e.message.statusCode).toEqual(400);
        expect(e.message.message).toEqual('The catalogue need a name');
      }
    });

    it ('should return error if category is missing', async () => {
      try {
        await service.createCatalogue({
          name: 'computers',
          description: 'Catálogo de Computadoras',
          term: 'COMPUTERS',
          status: {
            id: 1,
          },
        } as Catalogue);
      } catch (e) {
        expect(e.message.statusCode).toEqual(400);
        expect(e.message.message).toEqual('The catalogue need a category');
      }
    });

    it ('should return error if status is missing', async () => {
      try {
        await service.createCatalogue({
          name: 'computers',
          description: 'Catálogo de Computadoras',
          term: 'COMPUTERS',
          category: {
            id: 1,
          },
        } as Catalogue);
      } catch (e) {
        expect(e.message.statusCode).toEqual(400);
        expect(e.message.message).toEqual('The catalogue need a status');
      }
    });
  });

  describe('deleteCatalogue()', () => {
    it ('should delete a catalogue', async () => {
      const res = {
        id: 1,
        date_creacion: '2020-08-07 10:53:51.238835',
        date_modificacion: '2020-08-07 10:53:51.238835',
        name: 'Computers',
        description: 'Catálogo de Computadoras',
        term: 'COMPUTERS',
        category_id: 1,
        status_id: 1,
      };

      catalogueRepository.findOne = jest.fn().mockResolvedValue(res);
      catalogueRepository.save = jest.fn().mockResolvedValue(catalogueMockDB);
      statusService.getStatusById = jest.fn().mockResolvedValue(STATUS.INACTIVE.id);

      const response = await service.deleteCatalogue(1);
      expect(catalogueRepository.save).toHaveBeenCalled();
      expect(response).toEqual(true);
    });
  });

});
