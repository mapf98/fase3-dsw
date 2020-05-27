import { Injectable, HttpService,Inject ,forwardRef ,BadRequestException } from '@nestjs/common'
import { createQueryBuilder, Repository} from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressVerificationDto,AddressVerificationRO,AddressVerificationSO } from '../dto/AddressVerification.dto'
import { Address } from '../entities/address.entity'
import { AddressHttpRepository }  from '../repositories/address-http.repository'
import { UsersService } from '../../users/services/users.service'
import { STATUS, ROLE } from '../../../config/constants';
import { StatusService } from '../../status/services/status.service'  
import { Logger } from 'winston'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Response } from 'express';


@Injectable() export class AddressService {

    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @Inject(UsersService)
        private readonly usersService: UsersService,
        @Inject(StatusService)
        private readonly statusService: StatusService,
        @Inject(AddressHttpRepository) private readonly addressHttpRepository: AddressHttpRepository,
        private http: HttpService,
     ){}


    private async checkDefault(customerId : number, addressEntityManager){
        let active = STATUS.ACTIVE.id;
        let verifyDefault = await addressEntityManager.findOne({
              where: [
                { customer: customerId, status:active  },
              ]
        });

        if (verifyDefault){ 
            return false;        
        }
        else{
            return true;
        }
        
    }

    private async saveAddress(address:AddressVerificationDto , addressEntityManager){        
        try{               
            let currentCustomer = await this.usersService.findUser(address.customer.id);
            let allowDefault = await this.checkDefault(currentCustomer.id,addressEntityManager);
            let newAddress:Address =  new Address();
            newAddress.firstStreet = address.firstStreet;
            newAddress.secondStreet = address.secondStreet;
            newAddress.city = address.cityName;
            newAddress.state = address.state;
            newAddress.zipcode = address.zipcode;
            newAddress.customer = currentCustomer;
            newAddress.status = await this.statusService.getStatus(STATUS.ACTIVE.id);
            newAddress.setDefault = (allowDefault && address.default);
            await addressEntityManager.save(newAddress);

            this.logger.debug(`saveAddress:address save succesfully (address = ${JSON.stringify(address)}])`,
                { context: AddressService.name });
        }
        catch(e){
            this.logger.error(`saveAddress:failed to save address on the DB(error=${e.message}})`,
                        { context: AddressService.name });

            throw new BadRequestException('error when saving in the database');
        }    
    }    

    private async verificateAddress(body: AddressVerificationSO ){    
        try{
            return await this.addressHttpRepository.postAddressUri(body,{
                "auth-id" : `${process.env.SMARTSTREET_AUTH_KEY}`,
                "auth-token" : `${process.env.SMARTSTREET_AUTH_TOKEN}`
            });
        }
        catch(e){

            this.logger.error(`verificateAddress: failed to send the request to validate (body = ${JSON.stringify(body)}])`,
            { context: AddressService.name });
        }
    }

    async checkAddress(address: AddressVerificationRO, body , addressEntityManager ){        
        if(address[0].metadata.precision === "Unknown")
        {
            this.logger.debug(` checkAddress: invalid address (address = ${JSON.stringify(address)}]|body = ${JSON.stringify(body)})`,
                { context: AddressService.name });

            throw new BadRequestException('Invalid address');
        }
        else{
            this.saveAddress(body, addressEntityManager);        

            return address;
        }    
    }

    /**
    * envian la peticion de verificacion de direcccion con "verificateAddress", 
    * y  "checkAddress" revisa si la direccion es correcta o no
    * @param body es un objeto que contiene los datos de la direccion que introdujo el usuario
    * @returns string
    */
    async addressControl(body: AddressVerificationDto, addressEntityManager){    
        let addressSO:AddressVerificationSO= {
            'candidates' : 10,match : 'invalid',"street" :  `${body.firstStreet}`,
            "street2" :  `${body.secondStreet}`,"city" :  `${body.cityName}`,
            "state" :  `${body.state}`,"zipcode" : `${body.zipcode}`
        };

        let addressDetail:AddressVerificationRO = await this.verificateAddress(addressSO);        
        this.logger.debug(`addressControl: address verification request recibe succesfully (body = ${JSON.stringify(body)}])`,
            { context: AddressService.name });

        return this.checkAddress(addressDetail, body, addressEntityManager);
    }

    async updateAddressDefault( addressId : number , customerId: number ,addressEntityManager){
        let active = STATUS.ACTIVE.id;

        let verifyDefault= await addressEntityManager.findOne({
            where: [
                { customer: customerId, status:active, setDefault:true},
            ]
        });

        if (verifyDefault){
            this.logger.info(
                `updateAddressDefault: users ${customerId} alredy have a default (address = ${JSON.stringify(verifyDefault)}]) , changing...`,
                { context: AddressService.name });

            verifyDefault.setDefault=false;
            await addressEntityManager.save(verifyDefault);
        }

        let addressCurrentDefault = await addressEntityManager.findOne(addressId);        
        addressCurrentDefault.setDefault = true;
        await addressEntityManager.save(addressCurrentDefault);

        return "address updated succesfully";
    }

    async deleteAddress( addressId : number ,addressEntityManager){
        
        let innactiveAddress=await addressEntityManager.findOne({
              where: [
                {  id: addressId},
              ]
        });

        innactiveAddress.status= await this.statusService.getStatus(STATUS.INACTIVE.id);
        addressEntityManager.save(innactiveAddress);

        this.logger.info(`deleteAddress:address with id (addressId = ${addressId}) deleted succesfully`,
            { context: AddressService.name }); 

        return "address deleted succesfully";
    }

    async getAddress(customerId : number, addressEntityManager){
        let active = STATUS.ACTIVE.id; 

        return await addressEntityManager.find({
              where: [
                { customer: customerId, status:active  },
              ]
        });
    }
}