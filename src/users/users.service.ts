import { Injectable, HttpStatus, HttpException, NotFoundException, BadRequestException, ServiceUnavailableException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { IsValidEmail } from './../shared/validators/is-valid-email.validator';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async register(createUserDto: CreateUserDto): Promise<User> {
        // async createNewUser(newUser: CreateUserDto): Promise<User> { 
        if (IsValidEmail(createUserDto.email)) {
            let userRegistered = await this.findOneByEmail(createUserDto.email);
            if (!userRegistered) {
                // newUser.password = await bcrypt.hash(newUser.password, saltRounds);
                const createdUser = new this.userModel(createUserDto);
                console.log(createdUser);

                // createdUser.roles = ["User"];
                // return await createdUser.save();
                let newUser = await createdUser.save();
                return newUser;
                // let accessToken = this.authService.generateAccessToken(newUser);
                // let refreshToken = this.authService.generateRefreshToken(newUser);
                // return {
                //     accessToken,
                //     refreshToken
                // }
            } else {
                throw new HttpException('This user is already registered', HttpStatus.FORBIDDEN);
            }
        } else {
            throw new HttpException('Invalid email', HttpStatus.FORBIDDEN);
        }
    }


    async findOrCreate(profile): Promise<User> {
        const user = await this.userModel.findOne({ 'facebook.id': profile.id }).exec();
        if (user) {
            return user;
        }
        const createdUser = new this.userModel({
            method: "facebook",
            email: profile.emails[0].value,
            name: profile.name.givenName,
            facebook: {
                id: profile.id,
                avatar: profile.photos[0].value,
            },
        });

        // console.log(createdUser);

        return createdUser.save();
        // createdUser.save().then(user => {
        //     const accessToken = this.authService.generateAccessToken(user);
        //     return {
        //         accessToken
        //     };
        // })
    }

    async findOneByEmail(email): Promise<User> {
        // return await this.userModel.findOne({ email: email });
        return await this.userModel.findOne({ "email": email });
    }

    async findOneByEmailWithPassword(email): Promise<User> {
        return await this.userModel.findOne({ email: email }).select("+password");
    }

    async findOne(id): Promise<User> {
        // try {
        // let user: User = await this.userModel.findById(id).catch((err) => {
        //     throw new HttpException('User not found 2', HttpStatus.FORBIDDEN);
        // })
        let user: User = await this.userModel.findById(id);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        // return { name: user.name, email: user.email };
        return user;
        // } catch (err) {
        //     console.log(err);
        //     throw new ServiceUnavailableException("Can't find user");
        // }
    }

    async update(id: string, createUserDto: CreateUserDto): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, createUserDto, { new: true }).catch(() => {
            throw new HttpException("Can't update user", HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

}