import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { compare, genSalt, hash } from 'bcryptjs';
import * as jwt_decode from 'jwt-decode';
import { RefreshTokenDto } from './../users/dto/refresh-token.dto';
import { User } from './../users/interfaces/user.interface';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user: User = await this.usersService.findOneByEmailWithPassword(email);
        if (!user) {
            throw new HttpException('Wrong email', HttpStatus.NOT_FOUND);
        }
        const isMatch = await compare(pass, user.password);
        if (!isMatch) {
            throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
        }
        return user;
    }

    async login(userData: LoginUserDto) {
        let user: User = await this.validateUser(userData.email, userData.password);
        if (user) {
            const accessToken = this.generateAccessToken(user);
            const refreshToken = this.generateRefreshToken(user);
            return {
                accessToken,
                refreshToken
            };
        }
    }

    getDecodedToken(token: string): any {
        try {
            return jwt_decode(token);
        }
        catch (Error) {
            return null;
        }
    }

    async refresh(token: RefreshTokenDto) {
        console.log(token);
        // const decoded = jwt_decode(token.refreshToken);
        const decoded = this.getDecodedToken(token.refreshToken);
        console.log(decoded);

        if (decoded && decoded['email']) { //decoded['email'] ზედმეტია მგონი
            const email = decoded['email'];
            const user = await this.usersService.findOneByEmail(email);
            const accessToken = this.generateAccessToken(user);

            if (Date.now() >= decoded.exp * 1000) {
                throw new HttpException('Expired token', HttpStatus.UNAUTHORIZED);
                // return {
                //     accessToken: 'vadagasuli'
                // }
                // throw new HttpException({
                //     status: HttpStatus.FORBIDDEN,
                //     error: 'This is a custom message',
                // }, 403);
            }
            return {
                accessToken
            };//if unauthoried 
        } else {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        // const accessToken = this.generateAccessToken(user);

        // if (refreshToken in refreshTokens) {
        //     const user = {
        //       'username': refreshTokens[refreshToken],
        //       'role': 'admin'
        //     }
        //     const token = jwt.sign(user, SECRET, { expiresIn: 600 });
        //     res.json({jwt: token})
        //   }
        //   else {
        //     res.sendStatus(401);
        //   }

    }

    objectWithoutKey(object, key) {
        const { [key]: deletedKey, ...otherKeys } = object;
        return otherKeys;
    }

    async validateUserByJwt(payload: JwtPayload) {
        // This will be used when the user has already logged in and has a JWT
        try {
            let user = await this.usersService.findOneByEmail(payload.email);
            if (!user) {
                throw new UnauthorizedException();
            }
            return user
            // passportjs ის validate ფუნქციაშიც მაქ (jwt.strategy.ts ფაილში) UnauthorizedException დაჭერა, ერთერთგან მოშალე!!!
        } catch (err) {
            console.log(err);
        }
    }

    // async login(userData: LoginUserDto) {
    //     let user: User = await this.usersService.findOneByEmail(userData.email);
    //     if (!user) {
    //         throw new HttpException('Wrong email', HttpStatus.NOT_FOUND);
    //     }

    //     const isMatch = await compare(userData.password, user.password);
    //     if (!isMatch) {
    //         // throw new HttpException('Invalid crendentials', HttpStatus.BAD_REQUEST);
    //         throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    //     }
    //     // return this.createJwtPayload(user);
    //     let accessToken = this.generateAccessToken(user);
    //     let refreshToken = this.generateRefreshToken(user);

    //     user.refreshTokens.push(refreshToken);
    //     let updatedUser = await this.usersService.update(user.id, user);
    //     if (updatedUser) {
    //         return {
    //             accessToken,
    //             refreshToken
    //         }
    //     }
    // }


    // async refreshToken(token: RefreshTokenDto) {
    //     try {
    //         let decoded: JwtPayload = this.jwtService.verify(token.refreshToken);
    //         let user: User = await this.usersService.findOneByEmail(decoded.email);
    //         if (user.refreshTokens.length) {
    //             if (user.refreshTokens[token.refreshToken]) {
    //                 return 'generate new access token';
    //             }
    //         }
    //         return 'do nothing! you must login again!'
    //     } catch (err) {
    //         return {
    //             err,
    //             feedback: 'you must login again!'
    //         }
    //     }
    // };



    generateAccessToken(user: User) {
        let data: JwtPayload = {
            email: user.email,
            role: user.role
        };
        return this.jwtService.sign(data);
    }

    generateRefreshToken(user) {
        let data: JwtPayload = {
            email: user.email,
            role: user.role
        };
        return this.jwtService.sign(data, { expiresIn: '4m' });
    }

}