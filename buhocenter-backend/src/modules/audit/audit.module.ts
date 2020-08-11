import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditService } from './services/audit.service';
import { entities } from './entities';
import { RequestContextModule } from '../request-context/request-context.module';

@Module({
    imports: [TypeOrmModule.forFeature(entities), RequestContextModule],
    providers: [AuditService],
    exports: [AuditService],
})
export class AuditModule {}
