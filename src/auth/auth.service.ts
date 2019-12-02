import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

import { compare, genSalt, hash } from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService) {

    }

    async login(userData: LoginUserDto) {
        let user = await this.usersService.findOneByEmail(userData.email);
        if (!user) {
            throw new HttpException('Wrong email', HttpStatus.NOT_FOUND);
        }

        const isMatch = await compare(userData.password, user.password);

        if (!isMatch) {
            // throw new HttpException('Invalid crendentials', HttpStatus.BAD_REQUEST);
            throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
        }
        return this.createJwtPayload(user);

        // return new Promise((resolve, reject) => {
        //     // Check the supplied password against the hash stored for this email address
        //     user.checkPassword(userData.password, (err, isMatch) => {
        //         if (err) {
        //             console.log('ssss');
        //             throw new UnauthorizedException();
        //         }
        //         if (isMatch) {
        //             // If there is a successful match, generate a JWT for the user
        //             resolve(this.createJwtPayload(user));
        //         } else {
        //             // reject("The man doesn't want to keep his word")
        //             throw new UnauthorizedException('Wrong password');
        //         }
        //     });
        // });
    }

    async validateUserByJwt(payload: JwtPayload) {
        // This will be used when the user has already logged in and has a JWT
        let user = await this.usersService.findOneByEmail(payload.email);
        if (user) {
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }
    }

    createJwtPayload(user) {
        let data: JwtPayload = {
            email: user.email
        };
        let jwt = this.jwtService.sign(data);
        return {
            // expiresIn: 3600,
            expiresIn: 180,
            token: jwt
        }
    }

}