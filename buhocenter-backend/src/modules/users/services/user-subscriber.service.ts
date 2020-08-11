import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { User } from '../entities/user.entity';
import { EncriptionsService } from '../../encriptions/services/encriptions.service'

@Injectable()
export class UserSubscriber implements EntitySubscriberInterface<User> {

  constructor(
    @InjectConnection() readonly connection: Connection,    
    private encriptionsService: EncriptionsService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>): Promise<void> {      
    await this.encriptionsService.encriptObject(event.entity);
  } 

  public async afterLoad(entity: User){    
    await this.encriptionsService.decriptObject(entity);
  }

  async beforeUpdate(event: UpdateEvent<User>): Promise<void>{    
    await this.encriptionsService.encriptObject(event.entity);
  }
}