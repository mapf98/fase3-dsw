import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { SendPacketDimensionsDescriptions } from '../interfaces/send-packet-dimension-description';
import { SendPacketRO } from '../interfaces/send-packet-RO';

@Injectable()
export class SendPacketRepository {
    constructor(private readonly httpService: HttpService) {}

    async GetPacketShippingPrice(shippingData: SendPacketDimensionsDescriptions): Promise<any> {
        return await this.httpService
            .post(
                `${process.env.SHIPTHIS_BASE_URL}` + '/calculate-pickup',
                shippingData,
                /*{
                    headers: {
                        authorization:
                            'Bearer ' + token,
                    },
                },*/
            )
            .pipe(map(response => response.data))
            .toPromise();
    }

    async saveShippingPrice(shippingData: SendPacketDimensionsDescriptions): Promise<SendPacketRO> {
        return await this.httpService
            .post(
                `${process.env.SHIPTHIS_BASE_URL}` + '/create-pickup',
                shippingData,
                /*{
                    headers: {
                        authorization:
                            'Bearer ' + token,
                    },
                },*/
            )
            .pipe(map(response => response.data))
            .toPromise();
    }
}
