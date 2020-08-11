import { Module } from '@nestjs/common';
import { EncryptionsService } from './services/encryptions.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    providers: [EncryptionsService],
    exports: [EncryptionsService],
})
export class EncryptionsModule {}
