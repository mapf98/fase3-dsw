import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { CustomerLoyaltyAccumulatePoints } from '../interfaces/customer-loyalty-accumulate-points';
import {
    CustomerLoyaltyAssociateUser,
    CustomerLoyaltyAssociateUserResponse,
    CustomerLoyaltyAssociateUserCodeResponse,
} from '../interfaces/customer-loyalty-associate-user.interface';

@Injectable()
export class CustomerLoyaltyRepository {
    constructor(private readonly httpService: HttpService) {}

    async accumulatePoints(
        accumulatePointsRequest: CustomerLoyaltyAccumulatePoints,
        token: string,
    ): Promise<any> {
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
        return await this.httpService
            .post(
                `${process.env.PETROMILES_BASE_URL}third-party-clients/associate-user-token`,
                accumulatePointsRequest,
            )
            .pipe(map(response => response.data))
            .toPromise();
    }
}
