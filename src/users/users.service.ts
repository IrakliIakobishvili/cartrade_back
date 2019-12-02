import { Injectable, HttpStatus, HttpException, NotFoundException, BadRequestException, ServiceUnavailableException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { IsValidEmail } from './../shared/validators/is-valid-email.validator';


@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private userModel: Model<User>) { }

    // async create(createUserDto: CreateUserDto) {
    //     let createdUser = new this.userModel(createUserDto);
    //     return await createdUser.save();
    // }

    async create(createUserDto: CreateUserDto): Promise<User> {
        // async createNewUser(newUser: CreateUserDto): Promise<User> { 
        if (IsValidEmail(createUserDto.email)) {
            let userRegistered = await this.findOneByEmail(createUserDto.email);
            if (!userRegistered) {
                // newUser.password = await bcrypt.hash(newUser.password, saltRounds);
                let createdUser = new this.userModel(createUserDto);
                // createdUser.roles = ["User"];
                return await createdUser.save();
            } else {
                throw new HttpException('This user is already registered', HttpStatus.FORBIDDEN);
            }
        } else {
            throw new HttpException('Invalid email', HttpStatus.FORBIDDEN);
        }
    }


    async findOneByEmail(email): Model<User> {
        return await this.userModel.findOne({ email: email });
    }

    async findOne(id): Model<User> {
        // try {
        // let user: User = await this.userModel.findById(id).catch((err) => {
        //     throw new HttpException('User not found 2', HttpStatus.FORBIDDEN);
        // })
        let user: User = await this.userModel.findById(id);
        if (!user) {
            // throw new NotFoundException(`User not found`);
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return { name: user.name, email: user.email };
        // } catch (err) {
        //     console.log(err);
        //     throw new ServiceUnavailableException("Can't find user");
        // }
    }

}