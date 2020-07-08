import { Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Product } from '../../products/entities/product.entity';
import { CURRENCY } from '../../../config/constants';
import { SendPacketActions } from '../enums/send-packet-actions.enum';

import { SendPacketDimensionsDescriptions } from '../interfaces/send-packet-dimension-description';
import { SendPacketBasicInformation } from '../interfaces/send-packet-basic-information';
import { SendProductSO } from '../interfaces/send-product-SO';

import { SendPacketRepository } from '../repositories/send-packet.repository';

@Injectable()
export class SendPacketService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly sendPacketRepository: SendPacketRepository,
    ) {}

    public async calculatePackets(shippingData: SendPacketBasicInformation): Promise<any> {
        let shipThisTraductor: SendPacketDimensionsDescriptions = {
            commercial_ally_api_key: process.env.SHIPTHIS_API_KEY,
            Warehouse_id: 1,
            rec_first_name: shippingData.user.name,
            rec_last_name: shippingData.user.lastName,
            rec_email: shippingData.user.email,
            rec_phone_number: '+1 (505) 444-4444',
            destination_address:
                shippingData.address.firstStreet +
                shippingData.address.secondStreet +
                shippingData.address.city +
                shippingData.address.state +
                'US' +
                shippingData.address.zipcode,

            items: [
                {
                    description: '',
                    item_weight: 0,
                    item_length: 0,
                    item_width: 0,
                    item_height: 0,
                    characteristics: [],
                },
            ],
        };

        let itemTrackerNumber = 0;

        shippingData.carts.forEach(
            (cart, index) =>
                (shipThisTraductor.items[index] = {
                    description: cart.product.name,
                    item_weight: parseInt(cart.product.productDimension.weight),
                    item_length: parseInt(cart.product.productDimension.long),
                    item_width: parseInt(cart.product.productDimension.width),
                    item_height: parseInt(cart.product.productDimension.height),
                    characteristics: [],
                }),
        );
        //const token= process.env.SHIPTHIS_AUTH_TOKEN;

        const request: SendProductSO = {
            apiKey: process.env.SHIPTHIS_API_KEY,
            type: SendPacketActions.SEND,
            packet: shipThisTraductor,
        };

        return await this.sendPacketRepository.GetPacketShippingPrice(shipThisTraductor);
    }

    public async savePackets(shippingData: SendPacketBasicInformation): Promise<any> {
        let shipThisTraductor: SendPacketDimensionsDescriptions = {
            commercial_ally_api_key: process.env.SHIPTHIS_API_KEY,
            Warehouse_id: 1,
            rec_first_name: shippingData.user.name,
            rec_last_name: shippingData.user.lastName,
            rec_email: shippingData.user.email,
            rec_phone_number: '+1 (505) 444-4444',
            destination_address:
                shippingData.address.firstStreet +
                shippingData.address.secondStreet +
                shippingData.address.city +
                shippingData.address.state +
                'US' +
                shippingData.address.zipcode,

            items: [
                {
                    description: '',
                    item_weight: 0,
                    item_length: 0,
                    item_width: 0,
                    item_height: 0,
                    characteristics: [],
                },
            ],
        };

        let itemTrackerNumber = 0;

        shippingData.carts.forEach(
            (cart, index) =>
                (shipThisTraductor.items[index] = {
                    description: cart.product.name,
                    item_weight: parseInt(cart.product.productDimension.weight),
                    item_length: parseInt(cart.product.productDimension.long),
                    item_width: parseInt(cart.product.productDimension.width),
                    item_height: parseInt(cart.product.productDimension.height),
                    characteristics: [],
                }),
        );
        //const token= process.env.SHIPTHIS_AUTH_TOKEN;

        const request: SendProductSO = {
            apiKey: process.env.SHIPTHIS_API_KEY,
            type: SendPacketActions.SEND,
            packet: shipThisTraductor,
        };

        return await this.sendPacketRepository.saveShippingPrice(shipThisTraductor);
    }
}
