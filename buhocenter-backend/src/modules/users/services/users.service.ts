import { Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class UsersService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {}

    async getUsers(id: number): Promise<number> {
        this.logger.debug(`getUsers: obteniendo el id del usuario [id=${id}]`);
        this.logger.error(`getUsers: obteniendo el id del usuario [id=${id}]`);

        return id;
    }
}
