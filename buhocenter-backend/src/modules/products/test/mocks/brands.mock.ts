import { Brand } from '../../entities/brand.entity';

function createBrand(name: string): Brand{
  return {name} as Brand;
}

export const getAllBrandResponseMock: Brand[] = [createBrand('TestBrand1'), createBrand('TestBrand2'), createBrand('TestBrand3')];
export const getBrandByIdResponseMock = {id: 1, name: 'TestBrandById'};