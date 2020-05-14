import {Controller, Get, Res, HttpStatus} from '@nestjs/common';
import {ResponseLanguage} from '../interfaces/ResponseLanguage';
import {LanguagesService} from '../services/languages.service';

@Controller('languages')
export class LanguagesController {
    constructor(private readonly languageService: LanguagesService) {}

    @Get()
    async getAll(@Res() res): Promise<Response> {
        try {
            const dataResponse: ResponseLanguage = await this.languageService.getAll();
            return res.status(HttpStatus.OK).send(dataResponse);
        } catch (e) {
            return res.status(HttpStatus.NOT_FOUND).send();
        }
    }
}
