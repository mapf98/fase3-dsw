import { HttpService, Injectable, Inject } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CustomerLoyaltyAccumulatePoints } from '../interfaces/customer-loyalty-accumulate-points';
import {
    CustomerLoyaltyAssociateUser,
    CustomerLoyaltyAssociateUserResponse,
    CustomerLoyaltyAssociateUserCodeResponse,
} from '../interfaces/customer-loyalty-associate-user.interface';

@Injectable()
export class CustomerLoyaltyRepository {
    constructor(
        private readonly httpService: HttpService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    async accumulatePoints(
        accumulatePointsRequest: CustomerLoyaltyAccumulatePoints,
        token: string,
    ): Promise<any> {
        this.logger.debug(`accumulatePoints: fetching product points in PetroMiles...`, {
            context: CustomerLoyaltyRepository.name,
        });

        return await this.httpService
            .post(
                `${process.env.PETROMILES_BASE_URL}third-party-clients/add-points`,
                accumulatePointsRequest,
                {
                    headers: {
                        authorization: 'Bearer ' + token,
                    },
                },
            )
            .pipe(map(response => response.data))
            .toPromise();
    }

    public async authorize(
        associateUserRequest: CustomerLoyaltyAssociateUser,
    ): Promise<CustomerLoyaltyAssociateUserResponse> {
        this.logger.debug(`authorize: authorizing user in PetroMiles...`, {
            context: CustomerLoyaltyRepository.name,
        });

        return await this.httpService
            .post(
                `${process.env.PETROMILES_BASE_URL}third-party-clients/associate-user-code`,
                associateUserRequest,
            )
            .pipe(map(response => response.data))
            .toPromise();
    }

    async authorizeCode(
        accumulatePointsRequest: CustomerLoyaltyAssociateUser,
    ): Promise<CustomerLoyaltyAssociateUserCodeResponse> {
        this.logger.debug(`authorizeCode: validating user code in PetroMiles...`, {
            context: CustomerLoyaltyRepository.name,
        });

        return await this.httpService
            .post(
                `${process.env.PETROMILES_BASE_URL}third-party-clients/associate-user-token`,
                accumulatePointsRequest,
            )
            .pipe(map(response => response.data))
            .toPromise();
    }
}
