import { Controller, Inject, Post, Body, Header, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { CustomerLoyaltyService } from '../services/customer-loyalty.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { User } from '../../users/entities/user.entity';
import {
    CustomerLoyaltyAssociateUserResponse,
    CustomerLoyaltyAssociateUser,
} from '../interfaces/customer-loyalty-associate-user.interface';
import { CustomerLoyaltyUpdateProductPoints } from '../interfaces/customer-loyalty-update-product-points';
import { Product } from 'src/modules/products/entities/product.entity';
import { ReadStream } from 'fs';
import * as fs from 'fs';

@Controller('third-party')
export class ThirdPartyController {
    constructor(
        private readonly customerLoyaltyService: CustomerLoyaltyService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    @Post('/authorize')
    async authorize(@Body() user: Partial<User>): Promise<CustomerLoyaltyAssociateUserResponse> {
        this.logger.info(`authorize... [fidelityUserEmail=${user.fidelityUserEmail}]`, {
            context: ThirdPartyController.name,
        });

        return await this.customerLoyaltyService.authorize(user);
    }

    @Post('/authorize-code')
    async authorizeCode(
        @Body() user: Partial<User>,
    ): Promise<Partial<User & Partial<CustomerLoyaltyAssociateUser>>> {
        this.logger.info(`authorizeCode... [user=${JSON.stringify(user)}]`, {
            context: ThirdPartyController.name,
        });

        return await this.customerLoyaltyService.authorizeCode(user);
    }

    @Post('clients-csv')
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment; filename=clients.csv')
    async generateClientCsv(@Res() response): Promise<ReadStream> {
        this.logger.info(`generateClientCsv: generating client csv]`, {
            context: ThirdPartyController.name,
        });
        const stream = await this.customerLoyaltyService.generateClientCsv();
        return stream.pipe(response);
    }

    @Post('download/clients-csv')
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment; filename=clients.csv')
    async downloadCsvFile(@Res() response, @Body() data: { name: string }): Promise<ReadStream> {
        this.logger.info(`downloadCsvFile: downloading client csv ${JSON.stringify(data)}`, {
            context: ThirdPartyController.name,
        });
        const stream = this.customerLoyaltyService.downloadClientCsv(`reports/csv/${data.name}`);
        return stream.pipe(response);
    }

    @Post('/update-products-points')
    async updateProductPoints(@Body() userProducts: CustomerLoyaltyUpdateProductPoints): Promise<Product[]> {
        this.logger.info(`updateProductPoints... [userProducts=${JSON.stringify(userProducts)}]`, {
            context: ThirdPartyController.name,
        });

        return await this.customerLoyaltyService.updateProductPoints(userProducts);
    }
}
