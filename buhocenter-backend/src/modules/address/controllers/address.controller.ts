import { Controller, Get, Param, Post, Res, Body,HttpStatus,Inject } from '@nestjs/common';
import { AddressVerificationDto } from '../dto/AddressVerification.dto'
import { AddressService } from '../services/address.service';
import { Response } from 'express';
import { Logger } from 'winston'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'

@Controller('address') 
export class AddressController {
	
}
