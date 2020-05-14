import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import {GmailDto} from '../dto/GmailDto.dto';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import {ResponseAuth} from '../interfaces/ResponseAuth';
import { STATUS, ROLE, LANGUAGE } from '../../../config/constants';
import {CustomerDto} from '../dto/Customer.dto';
import {ResponseLanguage} from '../interfaces/ResponseLanguage';
import {Language} from '../entities/language.entity';

@Injectable()
export class LanguagesService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectRepository(Language) private languageRepository: Repository<Language>,
    ) {}

    async getAll(): Promise<ResponseLanguage> {
        let response: ResponseLanguage;
        const languages: Language[] = await this.languageRepository.find();
        response = {
            data: languages,
        };
        return response;
    }
}
