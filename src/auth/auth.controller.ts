import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { RefreshTokenDto } from './../users/dto/refresh-token.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post()
    async login(@Body() loginUserDto: LoginUserDto) {
        return await this.authService.login(loginUserDto);
    }

    @UseGuards(AuthGuard('facebook-token'))
    @Get('facebook')
    async getTokenAfterFacebookSignIn(@Req() req) {
        console.log(req.user);
        return req.user
    }


    // @Post('refresh')
    // async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    //     return await this.authService.refreshToken(refreshTokenDto);
    // }

}