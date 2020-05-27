import { Controller, Get, Post, Res, Body,HttpStatus,Inject, Patch,Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AddressVerificationDto, AddressUDDto, UsersAddress } from '../dto/AddressVerification.dto'
import { AddressService } from '../services/address.service';
import { Response } from 'express';
import { Logger } from 'winston'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { AddressTransactionsRepository } from '../transaction/address.transactions.service'
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard('jwt'))
@Controller('address') 
export class AddressController {
	constructor(
		private AddressService: AddressService,
		@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
		private readonly addressTransactionRepository: AddressTransactionsRepository
	){}

	@Post('verification') 
	async verifyAddress(
		@Res() res: Response,
		@Body() body: AddressVerificationDto
	): Promise<Response> {	    
		this.logger.info(`verifyAddress: recibiendo direccion (body = ${JSON.stringify(body)}])`,
            { context:AddressController.name });

	    try{
	        const response=await this.addressTransactionRepository.verifyAddress(body);
	        return res.status(HttpStatus.OK).send(response);
	    }
	    catch(e){
	   		this.logger.error(`verifyAddress: error al verificar la direccion [error =${JSON.stringify(e.message)}]})`,
            { context: AddressController.name });


	   		return res.status(HttpStatus.BAD_REQUEST).send(e.message);
	    }
    }

    @Patch() 
    async updateAddressDefault(
	    @Res() res: Response,
	    @Body() address: AddressUDDto 
    ): Promise<Response>{
    	try{
	  		let response= await this.addressTransactionRepository.updateAddressDefault(address);
	    	return res.status(HttpStatus.OK).send(response);
	    }
	    catch(e){
	   		this.logger.error(`getAddress: error when trying to get all address [error =${JSON.stringify(e.message)}]})`,
            { context: AddressController.name });

	   		return res.status(HttpStatus.BAD_REQUEST).send(e.message);
	    } 	
    }

    @Delete(':id') 
    async deleteAddress(
	    @Res() res: Response,
	    @Param('id') addressID: number
    ): Promise<Response>{    	
		try{
	        let response= await this.addressTransactionRepository.deleteAddress(addressID);      	  
    		return res.status(HttpStatus.OK).send(response);
	    }
	    catch(e){
	   		this.logger.error(`deleteAddress: error when trying to delete an address [error =${JSON.stringify(e.message)}]})`,
            { context: AddressController.name });

	   		return res.status(HttpStatus.BAD_REQUEST).send(e.message);
	    } 	
    }

    @Get() 
    async getAddress(
	    @Res() res: Response,
	    @Query('customerId') customerId: number, 
    ): Promise<Response>{
    	try{
    		console.log(1&&0);
	        let response= await this.addressTransactionRepository.getUserAddress(customerId);   
    		return res.status(HttpStatus.OK).send(response);
	    }
	    catch(e){
	   		this.logger.error(`getAddress: error when trying to get all address [error =${JSON.stringify(e.message)}]})`,
            { context: AddressController.name });

	   		return res.status(HttpStatus.BAD_REQUEST).send(e.message);
	    } 	
    }
}
