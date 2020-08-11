import { Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class EncriptionsService {
	constructor(
		@Inject(WINSTON_MODULE_PROVIDER) private readonly _logger: Logger,        
	) {}


	async encriptObject(pureContent: Object): Promise<void>{		
		const crypto = require('crypto');
		const algorithm = 'aes-256-cbc';
		let key2 = process.env.ENCRIPTION_KEYS1;
		const iv = process.env.ENCRIPTION_KEYS2; 
		this._logger.debug(`encriptObject: starting encription before inserting to the DB`, {
		    context: EncriptionsService.name,
		});


		for (var key in pureContent) {                                  
			if(typeof pureContent[key] !=  'object' && typeof pureContent[key] !=  'boolean' && typeof pureContent[key] != 'number' && typeof pureContent[key] != 'function')
			{
				if(key != "uid" && key !='birthdate'){
					let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key2, 'hex'), Buffer.from(iv, 'hex'));
					let encrypted = cipher.update(pureContent[key]);                                                          
					encrypted = Buffer.concat([encrypted, cipher.final()]);
					pureContent[key] =  encrypted.toString('base64') ;
				}
				
			}                                                        
		}       
	}

	async decriptObject(pureContent: Object): Promise<void>{  		
		const crypto = require('crypto');
		const algorithm = 'aes-256-cbc';  
		let key2 = process.env.ENCRIPTION_KEYS1;
		const iv = process.env.ENCRIPTION_KEYS2; 
		this._logger.debug(`decriptObject: starting decription before inserting to the DB`, {
		    context: EncriptionsService.name,
		});

		for (var key in pureContent) {                

			if(typeof pureContent[key] !=  'object' && typeof pureContent[key] !=  'boolean' && typeof pureContent[key] != 'function' && typeof pureContent[key] != 'number' && typeof pureContent[key] != 'function')
			{	
				if(key !='uid' && key !='birthdate'){					
					let encryptedText = Buffer.from(pureContent[key],'base64');
					let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key2,'hex'),  Buffer.from(iv,'hex'));      
					let decrypted = decipher.update(encryptedText, 'base64');
					decrypted = Buffer.concat([decrypted, decipher.final()]);                                                                       
					pureContent[key] = decrypted.toString();
				}													                    
			}                                                        
		}                                                          
	}

	async individualStringEncription(individualString: string): Promise<string>{
		const crypto = require('crypto');
		const algorithm = 'aes-256-cbc';
		let key2 = process.env.ENCRIPTION_KEYS1;
		const iv = process.env.ENCRIPTION_KEYS2; 
		this._logger.debug(`encriptObject: starting encription of the string`, {
		    context: EncriptionsService.name,
		});
		          
		let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key2, 'hex'), Buffer.from(iv, 'hex'));
		let encrypted = cipher.update(individualString);                                                          
		encrypted = Buffer.concat([encrypted, cipher.final()]);
		return encrypted.toString('hex') ;		    
	}	
}
