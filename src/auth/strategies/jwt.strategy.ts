import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
// import config from '../../config/keys';
import { jwtConstants } from './../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
            ignoreExpiration: false
        });

        // super({
        //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        //     secretOrKey: _configurationService.get(Configuration.JWT_KEY),
        // });

    }

    // async validate(payload: JwtPayload) {
    //     const user = await this.authService.validateUserByJwt(payload);
    //     if (!user) {
    //         throw new UnauthorizedException();
    //     }
    //     return user;
    // }

}