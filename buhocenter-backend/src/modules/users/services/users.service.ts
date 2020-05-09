import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import {GmailDto} from '../dto/GmailDto.dto';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import {ResponseAuth} from '../interfaces/ResponseAuth';
import { STATUS, ROLE } from '../../../config/constants';


@Injectable()
export class UsersService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    ) {}

    async getUsers(id: number): Promise<number> {
        this.logger.debug(`getUsers: obteniendo el id del usuario [id=${id}|env=${process.env.ROPSTEN_TESTNET_API_KEY}]`);
        this.logger.error(`getUsers: obteniendo el id del usuario [id=${id}]`, { context: UsersService.name } );
        return id;
    }

    async validateRegisterGmail(data: GmailDto): Promise<ResponseAuth> {
        const client: Customer = await this.customerRepository.findOne({
            where: {
                uid: data.clientData.uid,
            },
        });
        let clientSave: Customer;
        let response: ResponseAuth;
        if ( client ) {
            const newClient: Customer = this.customerRepository.merge(client, {
                token: data.token,
            });
            clientSave = await this.customerRepository.save(newClient);
        } else {
            clientSave = await this.customerRepository.save({
                name: data.clientData.first_name,
                lastName: data.clientData.last_name,
                uid: data.clientData.uid,
                token: data.token,
                status: {
                    id: STATUS.ACTIVE.id,
                },
                role: {
                    id: ROLE.CUSTOMER.id,
                },
            });
        }
        response = {
            token: clientSave.token,
            data: {
                id: clientSave.id,
                name: clientSave.name,
                lastName: clientSave.lastName,
                uid: clientSave.uid,
                status: clientSave.status,
                rol: clientSave.role,
                birthDate: clientSave.birthdate,
            },
        };
        return response;

    }
}
