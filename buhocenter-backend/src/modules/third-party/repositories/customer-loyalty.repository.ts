import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { CustomerLoyaltyAccumulatePoints } from '../interfaces/customer-loyalty-accumulate-points';

@Injectable()
export class CustomerLoyaltyRepository {
    constructor(private readonly httpService: HttpService) {}

    async accumulatePoints(accumulatePointsRequest: CustomerLoyaltyAccumulatePoints, token: string): Promise<any> {
        return await this.httpService
            .post(
                `${process.env.PETROMILES_BASE_URL}third-party-clients/add-points`,
                accumulatePointsRequest,
                {
                    headers: {
                        authorization:
                            'Bearer ' + token,
                    },
                },
            )
            .pipe(map(response => response.data))
            .toPromise();
    }
}
