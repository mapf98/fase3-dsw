import {Body, Controller, Get, Post, Param, ParseIntPipe, Res, HttpStatus} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { GmailDto } from '../dto/GmailDto.dto';
import {ResponseAuth} from '../interfaces/ResponseAuth';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    async getHello(@Param('id', new ParseIntPipe()) id: number): Promise<number> {
        return this.usersService.getUsers(id);
    }

    @Post('/login/gmail')
    async loginGmail(@Body() data: GmailDto, @Res() res): Promise<Response> {
        try {
            const dataResponse: ResponseAuth = await this.usersService.validateRegisterGmail(data);
            return res.status(HttpStatus.OK).send(dataResponse);
        } catch (e) {
            return res.status(HttpStatus.NOT_FOUND).send();
        }
    }
}
