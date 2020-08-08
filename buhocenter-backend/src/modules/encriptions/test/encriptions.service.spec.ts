import { Test, TestingModule } from '@nestjs/testing';
import { WinstonModule } from 'nest-winston';
import { LoggerSettingsService } from '../../settings/services/logger.service';
import { forwardRef, HttpModule, HttpService } from '@nestjs/common';
import { EncriptionsService } from '../services/encriptions.service'
import { EncriptionsModule } from '../encriptions.module'

describe('user encription-decription service', () => {
	let service: EncriptionsService;    
	beforeEach(async () => {
		process.env.ENCRIPTION_KEYS1 = 'c2d4e6bbeb1b5d8914f1e9feaccf8ba43efa55a7119a668f396a9f4ce291cd23';
		process.env.ENCRIPTION_KEYS2 = '3c20e5f3084971d920831db5970cccbf';
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				EncriptionsService,                
			],            
			imports: [
				WinstonModule.forRootAsync({
					useClass: LoggerSettingsService,
				}),
			],
		}).compile();
		service = module.get(EncriptionsService);        
	});

	describe('encripts a string', () => {
		it('must return the same string encripted', async () => {            
			let testObject = {
				"encript":"Hola buhocenter!",
			}
			service.encriptObject(testObject);            
			expect(testObject.encript).toEqual("629a38f88e7a165915c5263827aea3568db03d5bb7c4830d8ce768944bfaae26");
		});
	});

	describe('decript a string', () => {
		it('must return a decripted string', async () => {            
			let testObject = {
				"decript":"629a38f88e7a165915c5263827aea3568db03d5bb7c4830d8ce768944bfaae26",
			}
			service.decriptObject(testObject);            
			expect(testObject.decript).toEqual("Hola buhocenter!");
		});
	});
});
