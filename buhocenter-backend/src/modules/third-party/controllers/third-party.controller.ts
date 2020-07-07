import { Controller, Inject, Post, Body } from '@nestjs/common';
import { CustomerLoyaltyService } from '../services/customer-loyalty.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { User } from '../../users/entities/user.entity';
import {
    CustomerLoyaltyAssociateUserResponse,
    CustomerLoyaltyAssociateUser,
} from '../interfaces/customer-loyalty-associate-user.interface';

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
}
