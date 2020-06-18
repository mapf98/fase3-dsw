import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Catalogue } from '../entities/catalogue.entity';

@Injectable()
export class CataloguesService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectRepository(Catalogue)
        private readonly catalogueRepository: Repository<Catalogue>,
    ) {}

    public async getCatalogues() {
        return await this.catalogueRepository.find();
    }
}
