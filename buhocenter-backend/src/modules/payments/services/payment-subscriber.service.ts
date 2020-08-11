import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { PaymentsService } from './payments.service'
import { EncriptionsService } from '../../encriptions/services/encriptions.service'

@Injectable()
export class PaymentSubscriber implements EntitySubscriberInterface<Payment> {

  constructor(
    @InjectConnection() readonly connection: Connection,    
    private encriptionsService: EncriptionsService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Payment;
  }

  beforeInsert(event: InsertEvent<Payment>): void {           
    this.encriptionsService.encriptObject(event.entity);
  } 

  public afterLoad(entity: Payment){
    this.encriptionsService.decriptObject(entity);
  }

  beforeUpdate(event: UpdateEvent<Payment>): void{
    this.encriptionsService.encriptObject(event.entity);
  }
}