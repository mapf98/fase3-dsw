import {
    Controller,
    Get,
    Inject,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Brand } from '../entities/brand.entity';
import { BrandsService } from '../services/brands.service';

@Controller('brands')
export class BrandsController {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly brandsService: BrandsService,
    ) {}

    @Get()
    async getBrands(): Promise<Brand[]> {
        this.logger.info(`getBrands: getting all brands available`, {
            context: BrandsController.name,
        });
        
        return await this.brandsService.getAllBrands();
    }
}
