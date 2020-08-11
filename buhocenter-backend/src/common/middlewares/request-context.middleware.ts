import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from '../../modules/users/services/users.service';
import { User } from '../../modules/users/entities/user.entity';
import { AuthService } from '../../modules/auth/services/auth.service';
import { RequestContextService } from '../../modules/request-context/services/request-context.service';
import { EncryptionsService } from '../../modules/encryptions/services/encryptions.service';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
    /**
     *
     * @param logger
     */
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
        private readonly encryptionsService: EncryptionsService,
        private readonly requestContextService: RequestContextService,
    ) {}

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    async use(req: Request, res: Response, next: () => void) {
        let user: User;

        if (req.headers.authorization && !this.requestContextService.getUser()) {
            const token: string = req.headers.authorization.split(' ')[1];
            if (token) {
                const payload = await this.authService.decodeToken(token.replace('"', '').slice(0, -1));
                user = await this.usersService.getUserByUuid(
                    payload.uid
                );
                if (user) {
                    this.requestContextService.setUser(user.id);
                }
            }
        }

        next();
    }
}
