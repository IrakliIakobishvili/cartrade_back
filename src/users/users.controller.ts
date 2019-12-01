import { Controller, Get, Post, Param, Body, UseGuards, UseFilters } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { User } from './interfaces/user.interface';
// import { HttpExceptionFilter } from './../shared/filters/http-exception.filter';
// import { MongoExceptionFilter } from './../shared/filters/mongodb-exception.filter';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {

    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    // @UseFilters(new HttpExceptionFilter())
    // @UseFilters(MongoExceptionFilter)
    @Get(':id')
    findOne(@Param('id', new ValidateObjectId()) id): Promise<User> {
        return this.usersService.findOne(id);
    }

    // This route will require successfully passing our default auth strategy (JWT) in order
    // to access the route
    @Get('test')
    @UseGuards(AuthGuard())
    testAuthRoute() {
        return {
            message: 'You did it!'
        }
    }

}