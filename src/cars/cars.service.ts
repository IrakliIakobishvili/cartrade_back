import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './interfaces/car.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CarsService {
    constructor(@InjectModel('Car') private readonly carModel: Model<Car>) { }

    async findAll(): Promise<Car[]> {
        return await this.carModel.find()
            .populate('owner', '-password')
            .populate('diler', '-password')
            .populate({
                path: 'comments',
                select: '-car',
                model: 'Comment',
                populate: {
                    path: 'author',
                    select: '-password',
                    model: 'User',
                }
            })
            .populate('gallery')
            .exec();
    }

    async findOne(id: string): Promise<Car> {
        // let car = await this.carModel.findOne({ _id: id }).populate('owner').populate('diler').populate('comments.author').exec().catch((err) => {
        //     console.log(err);
        //     return false
        // })
        let car = await this.carModel.findOne({ _id: id })
            .populate('owner', '-password')
            .populate('diler', '-password')
            .populate({
                path: 'comments',
                model: 'Comment',
                populate: {
                    path: 'author',
                    model: 'User',
                }
            })
            .populate('gallery')
            .exec();
        if (!car) {
            throw new NotFoundException(`Car with ${id} not exists!`);
        }
        return car;
    }

    async create(createCarDto: CreateCarDto): Promise<Car> {
        const newCar = new this.carModel(createCarDto);
        return await newCar.save();
    }

    async delete(id: string): Promise<Car> {
        return await this.carModel.findByIdAndRemove(id).catch(() => {
            throw new HttpException("Can't delete car", HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    async update(id: string, createCarDto: CreateCarDto): Promise<Car> {
        console.log(id)
        console.log(createCarDto)
        return await this.carModel.findByIdAndUpdate(id, createCarDto, { new: true }).catch(() => {
            throw new HttpException("Can't update car", HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
}
