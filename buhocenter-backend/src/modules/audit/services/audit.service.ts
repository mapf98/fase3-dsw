import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RequestContextService } from '../../request-context/services/request-context.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Audit } from '../entities/audit.entity';
import * as rTracer from 'cls-rtracer';

@Injectable()
export class AuditService {
    constructor(
        @InjectRepository(Audit) private auditRepository: Repository<Audit>,
        private readonly requestContextService: RequestContextService,
    ) {}

    /**
     * Saves the event in audit table
     * @returns Promise<Audit>
     */
    public async save(event: Partial<Audit>): Promise<Audit> {
        if (this.requestContextService.getUser()) {
            event.user = { id: this.requestContextService.getUser() };
            event.transactionId = rTracer.id();
            return await this.auditRepository.save(event);
        }
    }
}
