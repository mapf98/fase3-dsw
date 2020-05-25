import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    /**
     * Valida el contenido del token proveniente de la petición
     * a la API
     * @param payload payload del token proveniente del request
     */
    async validate(payload: any) {
        return { uuid: payload.uid, username: payload.username };
    }
}