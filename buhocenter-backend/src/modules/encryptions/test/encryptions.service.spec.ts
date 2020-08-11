import { Test, TestingModule } from '@nestjs/testing';
import { WinstonModule } from 'nest-winston';
import { LoggerSettingsService } from '../../settings/services/logger.service';
import { EncryptionsService } from '../services/encryptions.service'

describe('user encription-decription service', () => {
	let service: EncryptionsService;    
	beforeEach(async () => {
		process.env.ENCRYPTION_KEYS1 = 'c2d4e6bbeb1b5d8914f1e9feaccf8ba43efa55a7119a668f396a9f4ce291cd23';
		process.env.ENCRYPTION_KEYS2 = '3c20e5f3084971d920831db5970cccbf';
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				EncryptionsService,                
			],            
			imports: [
				WinstonModule.forRootAsync({
					useClass: LoggerSettingsService,
				}),
			],
		}).compile();
		service = module.get(EncryptionsService);        
	});

	describe('encripts a string', () => {
		it('must return the same string encripted', async () => {            
			let testObject = {
				"encript":"Hola buhocenter!",
			}
			service.encryptObject(testObject);            
			expect(testObject.encript).toEqual("Ypo4+I56FlkVxSY4J66jVo2wPVu3xIMNjOdolEv6riY=");
		});
	});

	describe('decript a string', () => {
		it('must return a decripted string', async () => {            
			let testObject = {
				"decript":"Ypo4+I56FlkVxSY4J66jVo2wPVu3xIMNjOdolEv6riY=",
			}
			service.decryptObject(testObject);            
			expect(testObject.decript).toEqual("Hola buhocenter!");
		});
	});
});