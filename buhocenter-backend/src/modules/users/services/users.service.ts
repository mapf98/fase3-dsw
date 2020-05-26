import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { SendGridService } from '@anchan828/nest-sendgrid';
import {GmailDto} from '../dto/GmailDto.dto';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import {ResponseAuth} from '../interfaces/ResponseAuth';
import { STATUS, ROLE, LANGUAGE } from '../../../config/constants';
import {CustomerDto} from '../dto/Customer.dto';
import {ResponseRegister} from '../interfaces/ResponseRegister';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class UsersService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectRepository(Customer) private customerRepository: Repository<Customer>,
        private readonly sendGrid: SendGridService,
        private readonly authService: AuthService,
    ) {}

    async getUserByUuid(uid: string): Promise<Customer> {
        this.logger.debug(`login: Client exist [uid=${uid}]`, { context: UsersService.name } );

        return await this.customerRepository.findOne({
            where: { uid },
        });
    }

    /**
     * Permite actualizar la información del cliente
     * @param customer entidad que representa el objeto del cliente del cual se le va a modificar
     * los datos personales
     */
    public async updateCustomer(customer: Partial<Customer>): Promise<Customer> {
        this.logger.debug(`updateCustomer: modificando la información del cliente [customer=${
            JSON.stringify(customer)}]`, { context: UsersService.name } );
        return await this.customerRepository.save(customer);
    }

    /**
     * Envia un correo electronico de bienvenida al email y con el nombre enviado
     * @param data objeto con email y nombre, los cuales se usaran en el correo a enviar
     * @promise boolean
     */
    async sendEmailWelcome(data: { email: string; name: string; }): Promise<boolean> {
        try {
            const response = await this.sendGrid.send({
                to: data.email,
                from: 'buhocenter@gmail.com',
                subject: 'Welcome to buhocenter',
                templateId: 'd-4aa3a2d7aca54bdaa2688806f2401864',
                // @ts-ignore
                dynamic_template_data: {
                    name: data.name,
                },
            });
            this.logger.debug(`sendEmailWelcome: email sended [email=${data.email}]`, { context: UsersService.name } );
            return true;
        } catch (e) {
            this.logger.debug(`sendEmailWelcome: catch error email [email=${data.email}]`, { context: UsersService.name } );
            return false;
        }
    }

    /**
     * Funcion para registrar nuevos clientes
     * @param data DTO con los datos para registrar a un cliente
     * @promise ResponseRegister es una interfaces con el mensaje 
     */
    async registerCustomer(data: CustomerDto): Promise<ResponseRegister> {
        try {
            let response: ResponseRegister;
            const clientSave: Customer = await this.customerRepository.save({
                name: data.name,
                lastName: data.lastname,
                uid: data.uid,
                email: data.email,
                birthdate: data.birthdate,
                language:  data.language,
                is_federate: false,
                status: {
                    id: STATUS.ACTIVE.id,
                },
                role: {
                    id: ROLE.CUSTOMER.id,

                },
            });
            await this.sendEmailWelcome({email: data.email, name: data.name});
            this.logger.debug(`registerCustomer: user created [id=${clientSave.id}]`, { context: UsersService.name } );
            response = { message: 'Created' };
            return response;
        } catch (e) {
            this.logger.error(`registerCustomer: catch error [error=${e.message}]`, { context: UsersService.name } );
            return { message: 'Error at created' };
        }
    }

    /**
     * Funcion para iniciar sesion en la plataforma
     * @param data Objeto que contiene el token y uid del usuario en firebase
     */
    async login(data: { token: string, uid: string }): Promise<any> {
        const client: Customer = await this.getUserByUuid(data.uid);
        let clientSave: Customer;
        let response: ResponseAuth;
        if ( client ) {
            const newClient: Customer = this.customerRepository.merge(client, {
                token: data.token,
            });
            clientSave = await this.customerRepository.save(newClient);
            response = {
                apiAccessToken: await this.authService.login(clientSave),
                token: clientSave.token,
                data: {
                    id: clientSave.id,
                    name: clientSave.name,
                    lastName: clientSave.lastName,
                    uid: clientSave.uid,
                    email: clientSave.email,
                    is_federate: clientSave.is_federate,
                    status: clientSave.status,
                    rol: clientSave.role,
                    birthDate: clientSave.birthdate,
                    language: clientSave.language,
                },
            };
            this.logger.debug(`login: Client exist [id=${client.id}]`, { context: UsersService.name } );
            return response;
        }
        this.logger.error(`login: Client not exist [uid=${data.uid}]`, { context: UsersService.name } );
        return false;
    }

    async getUsers(id: number): Promise<number> {
        this.logger.debug(`getUsers: obteniendo el id del usuario [id=${id}|env=${process.env.ROPSTEN_TESTNET_API_KEY}]`);
        this.logger.error(`getUsers: obteniendo el id del usuario [id=${id}]`, { context: UsersService.name } );
        return id;
    }

    /**
     * Funcion para registrar e iniciar sesion con gmail o facebook
     * @param data DTO con datos necesarios para registrar clientes con gmail o facebook
     * @promise ResponseAuth objeto de respuesta de autenticacion
     */
    async validateRegisterSocial(data: GmailDto): Promise<ResponseAuth> {
        try {
            const client: Customer = await this.getUserByUuid(data.clientData.uid);
            let clientSave: Customer;
            let response: ResponseAuth;
            if ( client ) {
                const newClient: Customer = this.customerRepository.merge(client, {
                    token: data.token, is_federate: true
                });
                clientSave = await this.customerRepository.save(newClient);
                this.logger.debug(`validateRegisterSocial: client exist [id=${newClient.id}]`, { context: UsersService.name } );
            } else {
                // @ts-ignore
                clientSave = await this.customerRepository.save({
                    name: data.clientData.first_name,
                    lastName: data.clientData.last_name,
                    uid: data.clientData.uid,
                    email: data.clientData.email,
                    token: data.token,
                    is_federate: true,
                    status: {
                        id: STATUS.ACTIVE.id,
                    },
                    role: {
                        id: ROLE.CUSTOMER.id,
                    },
                    language:  LANGUAGE.ENGLISH.id,
                });
                this.logger.debug(`validateRegisterSocial: New client registered [id=${clientSave.id}]`, { context: UsersService.name } );
                await this.sendEmailWelcome({email: data.clientData.email, name: data.clientData.first_name});
            }
            response = {
                apiAccessToken: await this.authService.login(clientSave),
                token: clientSave.token,
                data: {
                    id: clientSave.id,
                    name: clientSave.name,
                    lastName: clientSave.lastName,
                    email: clientSave.email,
                    uid: clientSave.uid,
                    status: clientSave.status,
                    rol: clientSave.role,
                    is_federate: clientSave.is_federate,
                    birthDate: clientSave.birthdate,
                    language: clientSave.language,
                },
            };
            return response;
        } catch (e) {
            this.logger.error(`validateRegisterSocial: error message [e=${e.message}]`, { context: UsersService.name } );
        }
    }

    /**
     * Funcion para deslogear y borrar token en el cliente
     * @param data string que trae el UID del usuario a ser deslogeado
     */
    async logout(data: string): Promise<{ logout: boolean; }> {
        const client: Customer =   await this.customerRepository.findOne({
            where: {
                uid: data,
            },
        });
        let response: { logout: boolean; };
        if (client) {
            const newClient: Customer = this.customerRepository.merge(client, {
                token: '',
            });
            await this.customerRepository.save(newClient);
            this.logger.debug(`logout: loguot success, client [id=${data}]`, { context: UsersService.name } );
            response = {
                logout: true,
            };
        } else {
            this.logger.error(`logout: loguot error, client [id=${data}]`, { context: UsersService.name } );
            response = {
                logout: false,
            };
        }
        return response;
    }

    async findUser(UserID:number): Promise<Customer> {
        return await this.customerRepository.findOne(UserID);
    }
}