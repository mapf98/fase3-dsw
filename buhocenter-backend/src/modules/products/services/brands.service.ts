import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Brand } from '../entities/brand.entity';
import { StatusService } from '../../status/services/status.service';

@Injectable()
export class BrandsService {
    constructor(
        @InjectRepository(Brand)
        private readonly brandRepository: Repository<Brand>,
    ) {}

    public async getAllBrands(): Promise<Brand[]> {
        return await this.brandRepository.find();
    }

    public async getBrand(brandId: number): Promise<Brand> {
        return await this.brandRepository.findOne(brandId);
    }
}
