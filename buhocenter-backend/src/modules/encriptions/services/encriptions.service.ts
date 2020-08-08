import { Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class EncriptionsService {
	constructor(
		@Inject(WINSTON_MODULE_PROVIDER) private readonly _logger: Logger,        
	) {}


	encriptObject(pureContent: Object): void{
		const crypto = require('crypto');
		const algorithm = 'aes-256-cbc';
		let key2 = process.env.ENCRIPTION_KEYS1;
		const iv = process.env.ENCRIPTION_KEYS2; 
		this._logger.debug(`encriptObject: starting encription before inserting to the DB`, {
		    context: EncriptionsService.name,
		});


		for (var key in pureContent) {                                                   
			if(typeof pureContent[key] !=  'object' && typeof pureContent[key] !=  'boolean')
			{               
				let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key2, 'hex'), Buffer.from(iv, 'hex'));
				let encrypted = cipher.update(pureContent[key]);                                                          
				encrypted = Buffer.concat([encrypted, cipher.final()]);
				pureContent[key] =  encrypted.toString('hex') ;
			}                                                        
		}       
	}

	decriptObject(pureContent: Object): void{                                          
		const crypto = require('crypto');
		const algorithm = 'aes-256-cbc';  
		let key2 = process.env.ENCRIPTION_KEYS1;
		const iv = process.env.ENCRIPTION_KEYS2; 
		this._logger.debug(`decriptObject: starting decription before inserting to the DB`, {
		    context: EncriptionsService.name,
		});

		for (var key in pureContent) {                

			if(typeof pureContent[key] !=  'object' && typeof pureContent[key] !=  'boolean' && typeof pureContent[key] != 'function')
			{
				if(key!="id" && key!="createdAt" && key!="updatedAt"){       

					let encryptedText = Buffer.from(pureContent[key],'hex');
					let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key2,'hex'),  Buffer.from(iv,'hex'));      
					let decrypted = decipher.update(encryptedText);
					decrypted = Buffer.concat([decrypted, decipher.final()]);                                                                       
					pureContent[key] = decrypted.toString();
					
				}                      
			}                                                        
		}                                                          
	}    
}
