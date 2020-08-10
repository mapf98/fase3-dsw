import { Commission } from '../../entities/commission.entity';
import { CommissionDto, CommissionUpdateDto } from '../../dto/commissions.dto';

function commissionMock(id:number, createdAt: Date, updatedAt: Date, serviceFee: number, processorFee: number){
  return {id, createdAt, updatedAt, serviceFee, processorFee} as Commission;
} 

function createCommissionDto(serviceFee: number, processorFee: number){
  return {serviceFee, processorFee} as CommissionDto;
} 

function createUpdateCommissionDto(id: number, serviceFee: number, processorFee: number){
  return {id, serviceFee, processorFee} as CommissionUpdateDto;
} 

function createCommissionResponse(serviceFee: number, processorFee: number, status: number){
  return {serviceFee, processorFee, status};
} 

export const commissionMockDB: Commission[]= [
  commissionMock(1,new Date(),new Date(),0.01,0.01), 
  commissionMock(1,new Date(),new Date(),0.01,0.01)
];

export const commissionResponseMock: Commission = commissionMock(1, new Date(), new Date(), 0.01, 0.01);

export const createCommissionResponseCase1Mock = createCommissionResponse(0.01, 1, 1);
export const createCommissionResponseCase2Mock = createCommissionResponse(1, 0.01, 1);
export const createCommissionResponseCase3Mock = createCommissionResponse(0.01, 0.01, 1);
export const createCommissionResponseCase4Mock = createCommissionResponse(1, 1, 1);

export const commissionCreateCase1Mock: CommissionDto = createCommissionDto(0, 1);
export const commissionCreateCase2Mock: CommissionDto = createCommissionDto(1, 0);
export const commissionCreateCase3Mock: CommissionDto = createCommissionDto(0, 0);
export const commissionCreateCase4Mock: CommissionDto = createCommissionDto(1, 1);

export const commissionUpdateCase1Mock: CommissionUpdateDto = createUpdateCommissionDto(1, 0, 1);
export const commissionUpdateCase2Mock: CommissionUpdateDto = createUpdateCommissionDto(1, 1, 0);
export const commissionUpdateCase3Mock: CommissionUpdateDto = createUpdateCommissionDto(1, 0, 0);
export const commissionUpdateCase4Mock: CommissionUpdateDto = createUpdateCommissionDto(1, 1, 1);


