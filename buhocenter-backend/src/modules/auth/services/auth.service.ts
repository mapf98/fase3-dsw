import { Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtService } from '@nestjs/jwt';
import { Customer } from '../../users/entities/customer.entity';

@Injectable()
export class AuthService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly jwtService: JwtService,
    ) {}

    /**
     * Genera el token para los usuarios al momento de iniciar sesión
     * @param user objeto del usuario que se encuentra iniciando sesión
     */
    async login(user: Customer): Promise<string> {
        this.logger.debug(`login: generando el token para el usuario [uid=${user.uid}|email=${user.email}]`,
            { context: AuthService.name });

        const payload = { username: user.email, uid: user.uid };
        return this.jwtService.sign(payload);
    }
}
