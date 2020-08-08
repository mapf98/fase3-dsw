import { Module, forwardRef } from '@nestjs/common';
import { EncriptionsService } from './services/encriptions.service';
import { ProductsModule } from '../products/products.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({    
    providers: [EncriptionsService],
    exports: [EncriptionsService],
})
export class EncriptionsModule {}
