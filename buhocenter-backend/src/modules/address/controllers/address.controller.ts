import { Controller, Get, Param, Post, Res, Body,HttpStatus,Inject, UseGuards } from '@nestjs/common';
import { AddressVerificationDto } from '../dto/AddressVerification.dto'
import { AddressService } from '../services/address.service';
import { Response } from 'express';
import { Logger } from 'winston'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('address') 
export class AddressController {
	
}
