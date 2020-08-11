import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Provider } from '../entities/provider.entity';

@Injectable()
export class ProvidersService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectRepository(Provider)
        private readonly providerRepository: Repository<Provider>,
    ) {}

    public async getProvider(providerId: number): Promise<Provider> {
        return await this.providerRepository.findOne(providerId);
    }

    async getAllProviders(): Promise<Provider[]> {
        return await this.providerRepository.find();
    }
}
