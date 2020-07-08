import { SendPacketActions } from '../enums/send-packet-actions.enum';
import { SendPacketDimensionsDescriptions } from './send-packet-dimension-description';

//send-product-SO (Shipthis-Object)
export interface SendProductSO {
    apiKey: string;
    type: SendPacketActions;
    packet: SendPacketDimensionsDescriptions;
}
