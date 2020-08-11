import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { User } from '../entities/user.entity';
import { EncryptionsService } from '../../encryptions/services/encryptions.service';
import { Actions } from '../../audit/enums/actions.enum';
import { AuditService } from '../../audit/services/audit.service';
import { EXCLUDED_ENTITY_PROPERTIES } from '../../../config/constants';

@Injectable()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(
        @InjectConnection() readonly connection: Connection,
        private readonly encryptionsService: EncryptionsService,
        private readonly auditService: AuditService,
    ) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return User;
    }

    beforeInsert(event: InsertEvent<User>): void {
        this.encryptionsService.encryptObject(event.entity);
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

    afterLoad(entity: User) {
        this.encryptionsService.decryptObject(entity);
    }

    beforeUpdate(event: UpdateEvent<User>): void {
        this.encryptionsService.encryptObject(event.entity);
    }

    /**
     * Called after entity update.
     */
    async afterUpdate(event: UpdateEvent<any>) {
        const modifiedEntity: Object = this.encryptionsService.decryptObject(event.entity);

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
