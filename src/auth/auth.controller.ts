import { Controller, Post, Get, Body, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { RefreshTokenDto } from './../users/dto/refresh-token.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('local')
    async login(@Body() loginUserDto: LoginUserDto) {
        return await this.authService.login(loginUserDto);
    }

    @Post('refresh')
    async refresh(@Body() token: RefreshTokenDto) {
        return await this.authService.refresh(token);
    }

    @UseGuards(AuthGuard('facebook-token'))
    @Post('facebook')
    async getTokenAfterFacebookSignIn(@Req() req) {
        console.log(req.user);
        // generate jwt token and send to client!!!
        const accessToken = this.authService.generateAccessToken(req.user);
        return {
            accessToken
        };
        // return req.user
    }

    // @Post('refresh')
    // async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    //     return await this.authService.refreshToken(refreshTokenDto);
    // }

}