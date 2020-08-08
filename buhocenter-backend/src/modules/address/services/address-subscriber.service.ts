import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { Address } from '../entities/address.entity';
import { AddressService } from './address.service'
import { EncriptionsService } from '../../encriptions/services/encriptions.service'

@Injectable()
export class AddressSubscriber implements EntitySubscriberInterface<Address> {

  constructor(
    @InjectConnection() readonly connection: Connection,    
    private encriptionsService: EncriptionsService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Address;
  }

  beforeInsert(event: InsertEvent<Address>): void {           
    this.encriptionsService.encriptObject(event.entity);
  } 

  public afterLoad(entity: Address){
    this.encriptionsService.decriptObject(entity);
  }

  BeforeUpdate(event: UpdateEvent<Address>): void{
    this.encriptionsService.encriptObject(event.entity);
  }
}