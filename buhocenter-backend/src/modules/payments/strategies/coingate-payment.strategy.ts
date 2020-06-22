import { ConfigService } from '../../../config/config.service';
import { ConfigKeys } from '../../../config/config.keys';
import { testClient } from 'node_modules/coingate-v2';
import { IPaymentClient } from '../interfaces/payment-client';
import {
    MODE_TEST,
    PREFIX_CALLBACK_URL,
    PREFIX_CANCEL_URL,
    PREFIX_SUCCESS_URL,
    RECEIVE_CURRENCY,
    PRICE_CURRENCY,
    PAYMENT_TITLE,
} from '../payment.constants';

export class CoingatePaymentStrategy implements IPaymentClient {
    private _client: any;
    private _callbackURL: string;
    private _cancelURL: string;
    private _successURL: string;

    constructor(configService: ConfigService) {
        if (configService.get(ConfigKeys.BLOCKCHAIN_MODE) === MODE_TEST) {
            this._client = testClient(configService.get(ConfigKeys.COINGATE_API_KEY));
        }
        this._callbackURL = `${configService.get(ConfigKeys.PRODUCTION_URL)}${PREFIX_CALLBACK_URL}`;
        this._cancelURL = `${configService.get(ConfigKeys.PRODUCTION_URL)}${PREFIX_CANCEL_URL}`;
        this._successURL = `${configService.get(ConfigKeys.PRODUCTION_URL)}${PREFIX_SUCCESS_URL}`;
    }

    async createOrder(orderId: number, price: number) {
        return await this._client.createOrder({
            order_id: `${orderId}`,
            price_amount: price,
            price_currency: PRICE_CURRENCY,
            receive_currency: RECEIVE_CURRENCY,
            title: PAYMENT_TITLE,
            description: '',
            callback_url: this._callbackURL,
            cancel_url: this._cancelURL,
            success_url: this._successURL,
        });
    }
}
