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

    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }

    async validateUser(id: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(id);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
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
    // }

    // async validateUserByJwt(payload: JwtPayload) {
    //     // This will be used when the user has already logged in and has a JWT
    //     let user = await this.usersService.findOneByEmail(payload.email);
    //     if (user) {
    //         return this.createJwtPayload(user);
    //     } else {
    //         throw new UnauthorizedException();
    //     }
    // }

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



    // generateAccessToken(user: User) {
    //     let data: JwtPayload = {
    //         email: user.email,
    //         role: user.role
    //     };
    //     let accessToken = this.jwtService.sign(data);
    //     return {
    //         accessToken
    //     }
    // }

    // generateRefreshToken(user) {
    //     let data: JwtPayload = {
    //         email: user.email,
    //         role: user.role
    //     };
    //     let refreshToken = this.jwtService.sign(data, { expiresIn: '4m' });
    //     return {
    //         refreshToken
    //     }
    // }

}