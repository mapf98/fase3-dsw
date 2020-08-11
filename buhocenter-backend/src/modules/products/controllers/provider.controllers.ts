import {
    Controller,
    Get,
    Inject,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Provider } from '../entities/provider.entity';
import { ProvidersService } from '../services/providers.service';

@Controller('providers')
export class ProvidersController {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly providersService: ProvidersService,
    ) {}

    @Get()
    async getProviders(): Promise<Provider[]> {
        this.logger.info(`getProviders: getting all accesible brands `, {
            context: ProvidersController.name,
        });
        
        return await this.providersService.getAllProviders();
    }
}
