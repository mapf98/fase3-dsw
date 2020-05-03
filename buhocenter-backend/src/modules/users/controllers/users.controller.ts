import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    async getHello(@Param('id', new ParseIntPipe()) id: number): Promise<number> {
        return this.usersService.getUsers(id);
    }
}
