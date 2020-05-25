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
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
        @Inject(UsersService)
        private readonly UsersService: UsersService,
        @Inject(StatusService)
        private readonly StatusService: StatusService,
        @Inject(AddressHttpRepository) private readonly AddressHttpRepository: AddressHttpRepository,
        private http: HttpService
     ){}


    private async checkDefault(){
        let verifyDefault= await createQueryBuilder()
        .select('direccion')
        .from(Address,'direccion')
        .where('direccion.direccion_default= :bool',{bool:true})
        .getOne();

        if (verifyDefault){ 
            return false;        
        }
        else{
            return true;
        }
        
    }

    private async saveAddress(address:AddressVerificationDto){        
        try{               
            let allowDefault=await this.checkDefault();
            let newAddress:Address =  new Address();
            newAddress.firstStreet = address.firstStreet;
            newAddress.secondStreet = address.secondStreet;
            newAddress.city = address.cityName;
            newAddress.state = address.state;
            newAddress.zipcode = address.zipcode;
            newAddress.customer = await this.UsersService.findUser(address.customer.id);
            newAddress.status = await this.StatusService.getStatus(STATUS.ACTIVE.id);
            newAddress.setDefault = (allowDefault && address.default);
            await this.addressRepository.save(newAddress);
            this.logger.debug(`saveAddress:guardado exitoso de la direccion (address = ${JSON.stringify(address)}])`,
                { context: AddressService.name });
        }
        catch(e){
            this.logger.error(`saveAddress:fallo al guardar la direccion en la BD (address = ${JSON.stringify(address)})`,
                { context: AddressService.name });
        }    
    }    

    private async verificateAddress(body: AddressVerificationSO ){    
        try{
            return await this.AddressHttpRepository.postAddressUri(body,{
                "auth-id" : `${process.env.SMARTSTREET_AUTH_KEY}`,
                "auth-token" : `${process.env.SMARTSTREET_AUTH_TOKEN}`
            });
        }
        catch(e){
            this.logger.error(`verificateAddress:fallo al enviar el request para la validacion (body = ${JSON.stringify(body)}])`,
            { context: AddressService.name });
        }
    }

    async checkAddress(address: AddressVerificationRO, body){        
        if(address[0].metadata.precision === "Unknown")
        {
            this.logger.debug(` checkAddress: la direccion enviada es erronea(address = ${JSON.stringify(address)}]|body = ${JSON.stringify(body)})`,
                { context: AddressService.name });

            throw new BadRequestException('Invalid address');
        }
        else{
            this.saveAddress(body);        

            return address;
        }    
    }

    /**
    * envian la peticion de verificacion de direcccion con "verificateAddress", 
    * y  "checkAddress" revisa si la direccion es correcta o no
    * @param body es un objeto que contiene los datos de la direccion que introdujo el usuario
    * @returns string
    */
    async addressControl(body: AddressVerificationDto){    
        let addressSO:AddressVerificationSO= {
            'candidates' : 10,match : 'invalid',"street" :  `${body.firstStreet}`,
            "street2" :  `${body.secondStreet}`,"city" :  `${body.cityName}`,
            "state" :  `${body.state}`,"zipcode" : `${body.zipcode}`
        };

        let addressDetail:AddressVerificationRO = await this.verificateAddress(addressSO);        
        this.logger.debug(`AddressControl: request de verificacion de direccion recibido exitosamente (body = ${JSON.stringify(body)}])`,
            { context: AddressService.name });

        return this.checkAddress(addressDetail,body);
    }
}