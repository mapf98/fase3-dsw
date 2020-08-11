import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { AuditService } from '../../audit/services/audit.service';
import { Actions } from '../../audit/enums/actions.enum';
import { EXCLUDED_ENTITY_PROPERTIES } from '../../../config/constants';
import { Offer } from '../entities/offer.entity';

@Injectable()
export class OffersSubscriber implements EntitySubscriberInterface<Offer> {
    constructor(
        @InjectConnection() readonly connection: Connection,
        private readonly auditService: AuditService,
    ) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return Offer;
    }

    /**
     * Called after entity insertion.
     */
    async afterInsert(event: InsertEvent<any>) {
        await this.auditService.save({
            action: Actions.Insert,
            rowId: event.entity.id,
            tableAffected: event.metadata.tableName,
        });
    }

    /**
     * Called after entity update.
     */
    async afterUpdate(event: UpdateEvent<any>) {
        const modifiedEntity: Offer = event.entity;

        for await (let key of Object.keys(modifiedEntity)) {
            const oldValue: any = typeof event.databaseEntity[key] === 'object' && event.databaseEntity[key] ? event.databaseEntity[key].id : event.databaseEntity[key];
            const newValue: any = typeof modifiedEntity[key] === 'object' && modifiedEntity[key] ? modifiedEntity[key].id : modifiedEntity[key];

            if (!EXCLUDED_ENTITY_PROPERTIES.includes(key) && oldValue != newValue) {
                await this.auditService.save({
                    action: Actions.Update,
                    rowId: event.entity.id,
                    oldValue,
                    newValue,
                    attributeAffected: key as string,
                    tableAffected: event.metadata.tableName,
                });
            }
        }
    }
}
