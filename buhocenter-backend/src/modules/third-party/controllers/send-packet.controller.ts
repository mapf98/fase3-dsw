import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    ParseIntPipe,
    Query,
    Inject,
    Res,
    HttpStatus,
    Patch,
} from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { SendPacketService } from '../services/send-packet.service';
import { SendPacketBasicInformation } from '../interfaces/send-packet-basic-information';

@Controller('sendpacket')
export class SendPacketController {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly sendPacketService: SendPacketService,
    ) {}

    @Post()
    async sendPacket(
        @Res() res: Response,
        @Body() shippingData: SendPacketBasicInformation,
    ): Promise<Response> {
        this.logger.info(
            `sendPacket: sending packet data to ship this [shippingData=${JSON.stringify(shippingData)}]`,
            {
                context: SendPacketController.name,
            },
        );

        let response = await this.sendPacketService.calculatePackets(shippingData);
        return res.status(HttpStatus.OK).send(response);
    }

    @Post('/save')
    async savePacket(
        @Res() res: Response,
        @Body() shippingData: SendPacketBasicInformation,
    ): Promise<Response> {
        this.logger.info(
            `sendPacket: sending packet data to ship this [shippingData=${JSON.stringify(shippingData)}]`,
            {
                context: SendPacketController.name,
            },
        );

        let response = await this.sendPacketService.savePackets(shippingData);
        return res.status(HttpStatus.OK).send(response);
    }
}
