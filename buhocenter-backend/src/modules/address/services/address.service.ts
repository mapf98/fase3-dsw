import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import {
    AddressVerificationDto,
    AddressVerificationRO,
    AddressVerificationSO,
} from '../dto/AddressVerification.dto';
import { Address } from '../entities/address.entity';
import { AddressHttpRepository } from '../repositories/address-http.repository';
import { UsersService } from '../../users/services/users.service';
import { STATUS } from '../../../config/constants';
import { StatusService } from '../../status/services/status.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @Inject(UsersService)
        private readonly usersService: UsersService,
        @Inject(StatusService)
        private readonly statusService: StatusService,
        @Inject(AddressHttpRepository)
        private readonly addressHttpRepository: AddressHttpRepository,
        @InjectRepository(Address)
        private addressesRepository: Repository<Address>,
    ) {}

    /**
     * Checks if a given user has a default address
     * @param userId user id to check if it has default address
     * @param addressEntityManager transactional address repository
     */
    private async userHasDefaultAddress(userId: number) {
        this.logger.debug(`userHasDefaultAddress: checking user addresses [userId=${userId}]`, {
            context: AddressService.name,
        });
        
        const defaultAddress: Address = await this.addressesRepository.findOne({
            where: [{ user: userId, status: { id: STATUS.ACTIVE.id } }],
        });

        if (defaultAddress) {
            return true;
        }

        return false;
    }

    /**
     * Saves the given address in database
     * @param address address to save in database
     * @param addressEntityManager transactional address repository
     */
    private async saveAddress(
        address: AddressVerificationDto,
        addressEntityManager: Repository<Address>,
    ): Promise<void> {
        this.logger.debug(`saveAddress: saving address [address=${JSON.stringify(address)}]`, {
            context: AddressService.name,
        });

        try {
            const hasDefaultAddress: boolean = await this.userHasDefaultAddress(address.user.id);
            
            const newAddress: Partial<Address> = {
                firstStreet: address.firstStreet,
                secondStreet: address.secondStreet,
                city: address.cityName,
                state: address.state,
                zipcode: address.zipcode,
                user: await this.usersService.findUser(address.user.id),
                status: await this.statusService.getStatus(STATUS.ACTIVE.id),
                setDefault: hasDefaultAddress ? false : true,
            }

            await addressEntityManager.save(newAddress);

            this.logger.debug(`saveAddress: address saved!`, {
                context: AddressService.name,
            });
        } catch (e) {
            this.logger.error(
                `saveAddress: failed saving address in database [error=${e.message}]`,
                { context: AddressService.name },
            );

            throw new BadRequestException('Error when saving address in database');
        }
    }

    /**
     * Verifies the given address using SmartyStreets
     * @param body address to verify
     */
    private async verificateAddress(body: AddressVerificationSO) {
        this.logger.debug(
            `verificateAddress: verifying address [address=${JSON.stringify(body)}]`,
            { context: AddressService.name },
        );
        return await this.addressHttpRepository.postAddressUri(body);
    }

    async checkAddress(
        addressRecibeByAPIValidator: AddressVerificationRO,
        addressSendByTheUser: AddressVerificationDto,
        addressEntityManager: Repository<Address>,
    ) {
        this.logger.debug(`checkAddress: checking address [address=${JSON.stringify(addressSendByTheUser)}]`, {
            context: AddressService.name,
        });  
        
        if (this.addressValificationAnalysis(addressRecibeByAPIValidator)){
            await this.saveAddress(addressSendByTheUser, addressEntityManager);
            return addressRecibeByAPIValidator;
        } else {
            this.logger.debug(
                `checkAddress: invalid address [address=${JSON.stringify(
                    addressRecibeByAPIValidator,
                )}]|addressSendByTheUser=${JSON.stringify(addressSendByTheUser)}]`,
                { context: AddressService.name },
            );
            throw new BadRequestException('Invalid address');            
        }
    }

    /**
     * Send the request to verify the customer provided address
     * @param body address to verify
     * @returns string
     */
    public async addressControl(body: AddressVerificationDto, addressEntityManager) {
        this.logger.debug(
            `addressControl: address sending request to validate address [address= ${JSON.stringify(
                body,
            )}]`,
            { context: AddressService.name },
        );

        let addressSO: AddressVerificationSO = {
            candidates: 1,
            match: 'strict',
            street: `${body.firstStreet}`,
            street2: `${body.secondStreet}`,
            city: `${body.cityName}`,
            state: `${body.state}`,
            zipcode: `${body.zipcode}`,
        };

        const addressDetail: AddressVerificationRO = await this.verificateAddress(addressSO);

        this.logger.debug(
            `addressControl: address verified [addressDetail=${JSON.stringify(addressDetail)}]`,
            { context: AddressService.name },
        );
        return this.checkAddress(addressDetail, body, addressEntityManager);
    }

    /**
     * This method modifies the customer's current default address
     * @param addressId id of default current address
     * @param customerId logged in customer id
     * @param addressEntityManager transactional address repository
     */
    async updateAddressDefault(
        addressId: number,
        customerId: number,
        addressEntityManager: Repository<Address>,
    ) {
        this.logger.info(
            `updateAddressDefault: modifying default address [addressId=${addressId}|customerId=${customerId}]`,
            { context: AddressService.name },
        );

        let active = STATUS.ACTIVE.id;

        let verifyDefault = await addressEntityManager.findOne({
            where: [{ user: customerId, status: active, setDefault: true }],
        });

        if (verifyDefault) {
            this.logger.info(
                `updateAddressDefault: user previous default address [address=${JSON.stringify(
                    verifyDefault,
                )}]`,
                { context: AddressService.name },
            );

            verifyDefault.setDefault = false;
            await addressEntityManager.save(verifyDefault);
        }

        let addressCurrentDefault = await addressEntityManager.findOne(addressId);
        addressCurrentDefault.setDefault = true;
        await addressEntityManager.save(addressCurrentDefault);

        return 'Address modified succesfully';
    }

    /**
     * Deletes the given address
     * @param id address id to delete
     */
    async deleteAddress(id: number): Promise<UpdateResult> {
        this.logger.info(`deleteAddress: deleting address [id=${id}]`, {
            context: AddressService.name,
        });

        return await this.addressesRepository.update({ id }, { status: { id: STATUS.INACTIVE.id } });
    }

    /**
     * Returns the addresses of a user
     * @param userId logged in user id
     */
    async getAddresses(userId: number) {
        this.logger.info(`getAddress: getting addresses [userId=${userId}]`, {
            context: AddressService.name,
        });

        return await this.addressesRepository.find({
            where: { user: { id: userId }, status: { id: STATUS.ACTIVE.id } },
        });
    }

    addressValificationAnalysis(address): boolean{        
        if(address){
            if(address.length){                      
                if(address[0].metadata.precision === 'Unknown'){
                    return false;
                }else{
                    return true;
                } 
            }else{
                return false;
            }                
        }
    }
}
