import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { NavigationItem } from './interfaces/navigation.interface';
import { CreateNavigationDto } from './dto/create-navigation.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NavigationService {
    constructor(@InjectModel('Navigation') private readonly navigationModel: Model<NavigationItem>) { }

    async findAll(): Promise<NavigationItem[]> {
        return await this.navigationModel.find().exec();
    }

    async findOne(id: string): Promise<NavigationItem> {
        const navigation = await this.navigationModel.findOne({ _id: id }).exec();
        if (!navigation) {
            throw new NotFoundException(`navigation with ${id} not exists!`);
        }
        return navigation;
    }

    async create(createNavigationDto: CreateNavigationDto): Promise<NavigationItem> {
        const newnavigation = new this.navigationModel(createNavigationDto);
        return await newnavigation.save()
    }

    async delete(id: string): Promise<NavigationItem> {
        return await this.navigationModel.findByIdAndRemove(id).catch(() => {
            throw new HttpException("Can't delete navigation", HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    async update(id: string, createNavigationDto: CreateNavigationDto): Promise<NavigationItem> {
        return await this.navigationModel.findByIdAndUpdate(id, createNavigationDto, { new: true }).catch(() => {
            throw new HttpException("Can't update navigation",HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
}
