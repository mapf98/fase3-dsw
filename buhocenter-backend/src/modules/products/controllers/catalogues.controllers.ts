import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    ParseIntPipe,
    Inject,
    Delete,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Catalogue } from '../entities/catalogue.entity';
import { CataloguesService } from '../services/catalogues.service';

@Controller('catalogues')
export class CataloguesController {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly cataloguesService: CataloguesService,
    ) {}

    @Get()
    async getCatalogues(): Promise<Catalogue[]> {
        this.logger.info(`getCatalogues: getting all Catalogues available`, {
            context: CataloguesController.name,
        });
        
        return await this.cataloguesService.getCatalogues();
    }

    @Post()
    async createCatalogue(@Body() catalogue: Catalogue): Promise<Catalogue> {
        this.logger.info(`createCatalogue: Creating a catalogue `, {
            context: CataloguesController.name,
        });

        return await this.cataloguesService.createCatalogue(catalogue);
    }

    @Delete(':id')
    async deleteCatalogue(@Param('id', new ParseIntPipe()) catalogueId: number): Promise<Boolean> {
        this.logger.info(`deleteCatalogue: Deleting a catalogue `, {
            context: CataloguesController.name,
        });

        return await this.cataloguesService.deleteCatalogue(catalogueId);
    }
}
