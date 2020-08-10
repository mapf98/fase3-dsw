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

  beforeInsert(event: InsertEvent<User>): void {           
    this.encriptionsService.encriptObject(event.entity);
  } 

  public afterLoad(entity: User){
    this.encriptionsService.decriptObject(entity);
  }

  beforeUpdate(event: UpdateEvent<User>): void{
    this.encriptionsService.encriptObject(event.entity);
  }
}