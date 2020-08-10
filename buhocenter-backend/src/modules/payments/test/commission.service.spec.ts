import { Test, TestingModule } from '@nestjs/testing';
import { Commission } from '../entities/commission.entity';
import { StatusService } from '../../status/services/status.service';
import { Repository } from 'typeorm';
import { CommissionsService } from '../services/commissions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { STATUS } from '../../../config/constants';
import { WinstonModule } from 'nest-winston';
import { LoggerSettingsService } from '../../settings/services/logger.service';
import { repositoryMockFactory } from '../../../../test/mock.functions';
import { 
  commissionMockDB,
  commissionResponseMock,
  commissionCreateCase1Mock,
  commissionCreateCase2Mock,
  commissionCreateCase3Mock,
  commissionCreateCase4Mock,
  createCommissionResponseCase1Mock,
  createCommissionResponseCase2Mock,
  createCommissionResponseCase3Mock,
  createCommissionResponseCase4Mock,
  commissionUpdateCase1Mock,
  commissionUpdateCase2Mock,
  commissionUpdateCase3Mock,
  commissionUpdateCase4Mock
} from './mocks/commission.mock';

describe('commissionService', () => {
  let service: CommissionsService;
  let commissionRepository: Repository<Commission>;
  let statusService: StatusService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommissionsService,
        {
          provide: getRepositoryToken(Commission),
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

    service = module.get<CommissionsService>(CommissionsService);
    statusService = module.get<StatusService>(StatusService);
    commissionRepository = module.get(getRepositoryToken(Commission));
  });

  describe('getCommission()', () => {
    it('should get all commissions in the database', async () => {
      commissionRepository.find = jest.fn().mockResolvedValue(commissionMockDB);
      const response = await service.getCommission();
      expect(commissionRepository.find).toHaveBeenCalled();
      expect(response).toEqual(commissionMockDB);
    });
  });

  describe('getLastCommission()', () => {
    it('should get last commission in the database', async () => {
      commissionRepository.findOne = jest.fn().mockResolvedValue(commissionResponseMock);
      const response = await service.getLastCommission();
      expect(commissionRepository.findOne).toHaveBeenCalled();
      expect(response).toEqual(commissionResponseMock);
    });
  });

  describe('getCommissionById()', () => {
    it('should get commission by id in the database', async () => {
      commissionRepository.findOne = jest.fn().mockResolvedValue(commissionResponseMock);
      statusService.getStatusById = jest.fn().mockResolvedValue(STATUS.ACTIVE.id);
      const response = await service.getCommissionById(1);
      expect(commissionRepository.findOne).toHaveBeenCalled();
      expect(statusService.getStatusById).toHaveBeenCalled();
      expect(response).toEqual(commissionResponseMock);
      expect(response.id).toEqual(1);
    });
  });

  describe('getActiveCommission()', () => {
    it('should get active commission in the database', async () => {
      commissionRepository.createQueryBuilder = jest.fn().mockReturnValue({
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(commissionResponseMock),
      });
      const response = await service.getActiveCommission();
      expect(commissionRepository.createQueryBuilder).toHaveBeenCalled();
      expect(commissionRepository.createQueryBuilder().innerJoin).toHaveBeenCalled();
      expect(commissionRepository.createQueryBuilder().where).toHaveBeenCalled();
      expect(commissionRepository.createQueryBuilder().getOne).toHaveBeenCalled();
      expect(response).toBe(commissionResponseMock);
    });
  });

  describe('createCommission()', () => {
    let transactions;
    beforeEach(() => {
      transactions = {
        getRepository() {
          return commissionRepository;
        },
      };
    });
    it('should create commission in the database (case 1)', async () => {
      statusService.getStatusById = jest.fn().mockResolvedValue(STATUS.ACTIVE.id);
      transactions.save = jest.fn().mockResolvedValue(createCommissionResponseCase1Mock);
      service.getLastCommission = jest.fn().mockResolvedValue(commissionResponseMock);
      const response = await service.createCommission(commissionCreateCase1Mock, transactions);
      expect(statusService.getStatusById).toHaveBeenCalled();
      expect(service.getLastCommission).toHaveBeenCalled();
      expect(response).toEqual(createCommissionResponseCase1Mock);
    });
    it('should create commission in the database (case 2)', async () => {
      statusService.getStatusById = jest.fn().mockResolvedValue(STATUS.ACTIVE.id);
      transactions.save = jest.fn().mockResolvedValue(createCommissionResponseCase2Mock);
      service.getLastCommission = jest.fn().mockResolvedValue(commissionResponseMock);
      const response = await service.createCommission(commissionCreateCase2Mock, transactions);
      expect(statusService.getStatusById).toHaveBeenCalled();
      expect(service.getLastCommission).toHaveBeenCalled();
      expect(response).toEqual(createCommissionResponseCase2Mock);
    });
    it('should create commission in the database (case 3)', async () => {
      statusService.getStatusById = jest.fn().mockResolvedValue(STATUS.ACTIVE.id);
      transactions.save = jest.fn().mockResolvedValue(createCommissionResponseCase3Mock);
      service.getLastCommission = jest.fn().mockResolvedValue(commissionResponseMock);
      const response = await service.createCommission(commissionCreateCase3Mock, transactions);
      expect(statusService.getStatusById).toHaveBeenCalled();
      expect(service.getLastCommission).toHaveBeenCalled();
      expect(response).toEqual(createCommissionResponseCase3Mock);
    });
    it('should create commission in the database (case 4)', async () => {
      statusService.getStatusById = jest.fn().mockResolvedValue(STATUS.ACTIVE.id);
      transactions.save = jest.fn().mockResolvedValue(createCommissionResponseCase4Mock);
      service.getLastCommission = jest.fn().mockResolvedValue(commissionResponseMock);
      const response = await service.createCommission(commissionCreateCase4Mock, transactions);
      expect(statusService.getStatusById).toHaveBeenCalled();
      expect(service.getLastCommission).not.toHaveBeenCalled();
      expect(response).toEqual(createCommissionResponseCase4Mock);
    });
    it('should create commission in the database (case ERROR)', async () => {
      statusService.getStatusById = jest.fn().mockResolvedValue(STATUS.ACTIVE.id);
      transactions.save = jest.fn().mockResolvedValue(null);
      service.getLastCommission = jest.fn().mockResolvedValue(null);
      try {
        await service.createCommission(null, transactions);
      } catch (error) {
        expect(error.message.message).toBe('Error when creating commission in the database');
        expect(error.message.statusCode).toEqual(400);
      }
    });
  });

  describe('updateServiceFee()', () => {
    let transactions;
    beforeEach(() => {
      transactions = {
        getRepository() {
          return commissionRepository;
        },
      };
    });
    it('should update service fee commission in the database', async () => {
      transactions.update = jest.fn().mockResolvedValue(true);
      await service.updateServiceFee(1, 1, transactions);
      expect(transactions.update).toHaveBeenCalled();
    });
  });

  describe('updateProcessorFee()', () => {
    let transactions;
    beforeEach(() => {
      transactions = {
        getRepository() {
          return commissionRepository;
        },
      };
    });
    it('should update processor fee commission in the database', async () => {
      transactions.update = jest.fn().mockResolvedValue(true);
      await service.updateProcessorFee(1, 1, transactions);
      expect(transactions.update).toHaveBeenCalled();
    });
  });

  describe('updateCommission()', () => {
    let transactions;
    beforeEach(() => {
      transactions = {
        getRepository() {
          return commissionRepository;
        },
      };
    });
    it('should update commission in the database (case 1)', async () => {
      transactions.update = jest.fn().mockResolvedValue(true);
      service.updateProcessorFee = jest.fn().mockResolvedValue(true);
      service.updateServiceFee = jest.fn().mockResolvedValue(true);
      const response = await service.updateCommission(commissionUpdateCase1Mock, transactions);
      expect(service.updateProcessorFee).toHaveBeenCalled();
      expect(service.updateServiceFee).not.toHaveBeenCalled();
      expect(response).toBe('Commission updated');
    });
    it('should update commission in the database (case 2)', async () => {
      transactions.update = jest.fn().mockResolvedValue(true);
      service.updateProcessorFee = jest.fn().mockResolvedValue(true);
      service.updateServiceFee = jest.fn().mockResolvedValue(true);
      const response = await service.updateCommission(commissionUpdateCase2Mock, transactions);
      expect(service.updateProcessorFee).not.toHaveBeenCalled();
      expect(service.updateServiceFee).toHaveBeenCalled();
      expect(response).toBe('Commission updated');
    });
    it('should update commission in the database (case 3)', async () => {
      transactions.update = jest.fn().mockResolvedValue(true);
      service.updateProcessorFee = jest.fn().mockResolvedValue(true);
      service.updateServiceFee = jest.fn().mockResolvedValue(true);
      const response = await service.updateCommission(commissionUpdateCase3Mock, transactions);
      expect(service.updateProcessorFee).not.toHaveBeenCalled();
      expect(service.updateServiceFee).not.toHaveBeenCalled();
      expect(response).toBe('Commission updated');
    });
    it('should update commission in the database (case 4)', async () => {
      transactions.update = jest.fn().mockResolvedValue(true);
      service.updateProcessorFee = jest.fn().mockResolvedValue(true);
      service.updateServiceFee = jest.fn().mockResolvedValue(true);
      const response = await service.updateCommission(commissionUpdateCase4Mock, transactions);
      expect(service.updateProcessorFee).toHaveBeenCalled();
      expect(service.updateServiceFee).toHaveBeenCalled();
      expect(response).toBe('Commission updated');
    });
  });

  describe('deleteCommission()', () => {
    let transactions;
    beforeEach(() => {
      transactions = {
        getRepository() {
          return commissionRepository;
        },
      };
    });
    it('should delete a commission in the database', async () => {
      statusService.getStatusById = jest.fn().mockResolvedValue(STATUS.INACTIVE.id);
      transactions.update = jest.fn().mockResolvedValue(true);
      const response = await service.deleteCommission(1, transactions);
      expect(response).toBeTruthy();
    });
    it('should fail delete a commission in the database', async () => {
      statusService.getStatusById = jest.fn().mockResolvedValue(null);
      transactions.update = jest.fn().mockResolvedValue(null);
      const response = await service.deleteCommission(null, null);
      expect(response).toBeUndefined();
    });
  });
});
