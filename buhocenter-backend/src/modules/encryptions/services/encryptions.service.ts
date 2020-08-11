import { Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { EXCLUDED_ENTITY_PROPERTIES } from '../../../config/constants';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionsService {
	constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly _logger: Logger) {}

	private _algorith: string = 'aes-256-cbc';
	
	/**
     * Encrypts a content using crypto. The default algorithm
     * to execute the encryption is aes-256-cbc.
     * @param pureContent content to be encrypted
     * @returns void
     */
    public encryptObject(pureContent: Object): void {
		const key2: string = process.env.ENCRYPTION_KEYS1;
		const iv: string = process.env.ENCRYPTION_KEYS2; 
		this._logger.debug(`encryptObject: starting encription before inserting to the DB`, {
		    context: EncryptionsService.name,
		});

		for (let key in pureContent) {   
			if(typeof pureContent[key] !=  'object' && typeof pureContent[key] !=  'boolean' && typeof pureContent[key] != 'number' && typeof pureContent[key] != 'function') {
				if(!EXCLUDED_ENTITY_PROPERTIES.includes(key)){
					const cipher: crypto.Cipher = crypto.createCipheriv(this._algorith, Buffer.from(key2, 'hex'), Buffer.from(iv, 'hex'));
					let encrypted = cipher.update(pureContent[key]);                                                          
					encrypted = Buffer.concat([encrypted, cipher.final()]);
					pureContent[key] =  encrypted.toString('base64') ;
				}
			}                                                        
		}
    }

	/**
	 * individualStringEncryption
	 * @param individualString string
	 * @returns string
	 */
    public individualStringEncryption(individualString: string): string {
		const key2: string = process.env.ENCRYPTION_KEYS1;
		const iv: string = process.env.ENCRYPTION_KEYS2; 
		
		this._logger.debug(`individualStringEncryption: starting encryption of string`, {
		    context: EncryptionsService.name,
		});
		          
		const cipher: crypto.Cipher = crypto.createCipheriv(this._algorith, Buffer.from(key2, 'hex'), Buffer.from(iv, 'hex'));
		let encrypted: Buffer = cipher.update(individualString);                                                          
		encrypted = Buffer.concat([encrypted, cipher.final()]);
		return encrypted.toString('base64');
	}

    /**
     * Decrypts a content using crypto. The default algorithm
     * to execute the decryption is aes-256-cbc.
     * @param pureContent content to be decrypted
     * @returns Object
     */
    public decryptObject(pureContent: Object): Object {
        const crypto = require('crypto');
		const key2: string = process.env.ENCRYPTION_KEYS1;
		const iv: string = process.env.ENCRYPTION_KEYS2; 
		
		this._logger.debug(`decriptObject: starting decription before inserting to the DB`, {
		    context: EncryptionsService.name,
		});

		for (let key in pureContent) {                
			if (typeof pureContent[key] != 'object' && typeof pureContent[key] !=  'boolean' && typeof pureContent[key] != 'function' && typeof pureContent[key] != 'number' && typeof pureContent[key] != 'function') {	
				if(!EXCLUDED_ENTITY_PROPERTIES.includes(key)){					
					let encryptedText: Buffer = Buffer.from(pureContent[key],'base64');
					let decipher = crypto.createDecipheriv(this._algorith, Buffer.from(key2,'hex'),  Buffer.from(iv,'hex'));      
					let decrypted = decipher.update(encryptedText, 'base64');
					decrypted = Buffer.concat([decrypted, decipher.final()]);                                                                       
					pureContent[key] = decrypted.toString();
				}
			}                                                        
		}

		return pureContent;
    }
}
