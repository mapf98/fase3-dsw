import { Injectable, Inject } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { InjectConnection } from "@nestjs/typeorm";
import { Logger } from "winston";
import { Connection } from 'typeorm';
import { AddressService } from "../services/address.service";
import { AddressUDDto, UsersAddress } from '../dto/AddressVerification.dto'
import { Address } from '../entities/address.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository} from 'typeorm';

@Injectable()
export class AddressTransactionsRepository {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectConnection() private readonly connection: Connection,
        private readonly addressService: AddressService,
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
    ) {}


    public async updateAddressDefault( address :  AddressUDDto): Promise<string> {
        this.logger.info(`updateAddressDefault: starting update deafault address : [address=${JSON.stringify(address)}]`,
            { context: AddressTransactionsRepository.name });

        return await this.connection.transaction(async transactionalEntityManage => {
            return await this.addressService.updateAddressDefault(address.id,address.customer.id, this.addressRepository);
        })
    }

    public async deleteAddress( addressId : number ): Promise<string> {
        this.logger.info(`deleteAddress: starting process delete address id: [addressId= ${addressId}]`,
            { context: AddressTransactionsRepository.name });

        return await this.connection.transaction(async transactionalEntityManager => {
            return await this.addressService.deleteAddress(addressId, this.addressRepository);
        })
    }

    public async getUserAddress(customerId : number): Promise<any>{
        this.logger.info(` getUserAddress: starting process to get all address of user [usersAddress= ${customerId}]`,
            { context: AddressTransactionsRepository.name });

        return this.connection.transaction(async transactionalEntityManager => {
            return await this.addressService.getAddress(customerId, this.addressRepository);
        })
    }

    public async verifyAddress( address ): Promise<any>{
         this.logger.info(` verifyAddress: starting process to verify address [Address= ${JSON.stringify(address)}]`,
            { context: AddressTransactionsRepository.name });

        return this.connection.transaction(async transactionalEntityManager => {
            return await this.addressService.addressControl(address, this.addressRepository);
        })

    }

}