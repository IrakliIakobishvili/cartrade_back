import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtDto } from './dto/create-jwt.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post()
    async login(@Body() loginUserDto: LoginUserDto) {
        return await this.authService.login(loginUserDto);
    }

    @Post('refresh')
    async refresh(@Body() jwtDto: JwtDto) {
        return await this.authService.createRefreshToken(jwtDto);
    }

}