import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { compare, genSalt, hash } from 'bcryptjs';
import { RefreshTokenDto } from './../users/dto/refresh-token.dto';
import { User } from './../users/interfaces/user.interface';
// verify

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async login(userData: LoginUserDto) {
        let user: User = await this.usersService.findOneByEmail(userData.email);
        if (!user) {
            throw new HttpException('Wrong email', HttpStatus.NOT_FOUND);
        }

        const isMatch = await compare(userData.password, user.password);
        if (!isMatch) {
            // throw new HttpException('Invalid crendentials', HttpStatus.BAD_REQUEST);
            throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
        }
        // return this.createJwtPayload(user);
        let accessToken = this.generateAccessToken(user);
        let refreshToken = this.generateRefreshToken(user);

        user.refreshTokens.push(refreshToken);
        let updatedUser = await this.usersService.update(user.id, user);
        if (updatedUser) {
            return {
                accessToken,
                refreshToken
            }
        }

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


    async refreshToken(token: RefreshTokenDto) {
        try {
            let decoded: JwtPayload = this.jwtService.verify(token.refreshToken);
            let user: User = await this.usersService.findOneByEmail(decoded.email);
            if (user.refreshTokens.length) {
                if (user.refreshTokens[token.refreshToken]) {
                    return 'generate new access token';
                }
            }
            return 'do nothing! you must login again!'
        } catch (err) {
            return {
                err,
                feedback: 'you must login again!'
            }
        }

        // const refreshToken = req.body.refreshToken;
        // this.usersService.findOne();
        // if (refreshToken in refreshTokens) {
        //   const user = {
        //     'username': refreshTokens[refreshToken],
        //     'role': 'admin'
        //   }
        //   const token = jwt.sign(user, SECRET, { expiresIn: 600 });
        //   res.json({jwt: token})
        // }
        // else {
        //   res.sendStatus(401);
        // }
    };

    // async validateUserByJwt(payload: JwtPayload) {
    //     // This will be used when the user has already logged in and has a JWT
    //     let user = await this.usersService.findOneByEmail(payload.email);
    //     if (user) {
    //         return this.createJwtPayload(user);
    //     } else {
    //         throw new UnauthorizedException();
    //     }
    // }

    generateAccessToken(user: User) {
        let data: JwtPayload = {
            email: user.email,
            role: user.role
        };
        let accessToken = this.jwtService.sign(data);
        return {
            accessToken
        }
    }

    generateRefreshToken(user) {
        let data: JwtPayload = {
            email: user.email,
            role: user.role
        };
        let refreshToken = this.jwtService.sign(data, { expiresIn: '4m' });
        return {
            refreshToken
        }
    }

}