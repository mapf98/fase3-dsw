import { Test, TestingModule } from '@nestjs/testing';
import { WinstonModule } from 'nest-winston';
import { LoggerSettingsService } from '../../settings/services/logger.service';
import { forwardRef, HttpModule, HttpService } from '@nestjs/common';
import { AddressService } from '../services/address.service';
import { Address } from '../entities/address.entity';
import { AddressValidationRepository } from '../repositories/address.repository';
import { AddressTransactionsRepository } from '../transaction/address.transactions.service';
import { MockFunctionInterface, repositoryMockFactory } from '../../../../test/mock.functions';
import { getRepositoryToken } from '@nestjs/typeorm';
import { addressMockDB, addressMockDelete } from './mocks/address.mock'
import { UsersService } from '../../users/services/users.service'
import { StatusService } from '../../status/services/status.service'
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Status } from '../../status/entities/status.entity';
import { StatusHistory } from '../../status/entities/status-history.entity';
import { EmailsService } from '../../notifications/services/emails.service';
import { AuthService } from '../../auth/services/auth.service';
import { JwtStrategy } from '../../auth/strategies/jwt.strategy';
import { LanguagesService } from '../../users/services/languages.service';
import { LanguageRepository } from '../../users/repositories/language.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SendGridModule, SendGridService } from '@anchan828/nest-sendgrid';

describe('address service', () => {
	let service: AddressService;    
	let addressRepository: MockFunctionInterface;
	beforeEach(async () => {
		process.env.SMARTSTREET_AUTH_KEY = '018e48c3-9ab3-4ea4-1f51-62a3c351c9a5';
		process.env.SMARTSTREET_AUTH_TOKEN = 'rutHqaVC3bklTQiZHWYW';
		process.env.DIRECTION_VERIFICATION_URL = 'https://us-street.api.smartystreets.com/street-address';
		process.env.JWT_SECRET = 'key4test';
        process.env.JWT_EXPIRES_IN = '60s';        
        process.env.SENDGRID_API_KEY = 'SG.NONE';        


		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AddressService,
				AddressValidationRepository,
				JwtStrategy,
				{
                    provide: getRepositoryToken(Address),
                    useFactory: repositoryMockFactory,
                },
                {
                    provide: getRepositoryToken(User),
                    useFactory: repositoryMockFactory,
                },
                {
                    provide: getRepositoryToken(Status),
                    useFactory: repositoryMockFactory,
                },
                {
                    provide: getRepositoryToken(StatusHistory),
                    useFactory: repositoryMockFactory,
                },
                StatusService,
                EmailsService,
                AuthService,
                LanguagesService,
                LanguageRepository,
                UsersService,
			],
			imports: [
				WinstonModule.forRootAsync({
					useClass: LoggerSettingsService,
				}),
				HttpModule,
				SendGridModule.forRoot({
                    apikey: process.env.SENDGRID_API_KEY,
                }),
                JwtModule.registerAsync({
                    useFactory: async () => ({
                        secret: process.env.JWT_SECRET,
                        signOptions: {
                            expiresIn: process.env.JWT_EXPIRES_IN,
                        },
                    }),
                }),
			],
		}).compile();
		service = module.get(AddressService);
		addressRepository =  module.get(getRepositoryToken(Address));
	});

	describe('get addresses', () => {
		it('return all the addresses of 1 specific user only', async () => {            
			addressRepository.find.mockResolvedValue(addressMockDB);			
			let testAddress:Address[] = await service.getAddresses(1);
			expect(testAddress.length).toEqual(2);
		});
	});

	/*describe('delete address', () => {
		it('return the address with status 2', async () => {            
			addressRepository.update.mockResolvedValue(addressMockDelete[0]);
			let  = await service.deleteAddress(1);
			expect(testAddress.length).toEqual(2);
		});
	});*/

	describe('update default address', () => {
		it('set the specified address to default, and change the previous default to 0', async () => {            
			addressRepository.findOne.mockResolvedValue(addressMockDelete[0]);			
			let updateTest = await service.updateAddressDefault(1,1);
			expect(updateTest).toEqual('Address modified succesfully');
		});
	});

});
