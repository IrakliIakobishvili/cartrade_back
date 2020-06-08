import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { NavigationItem } from './interfaces/navigation.interface';
import { CreateNavigationDto } from './dto/create-navigation.dto';
import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Navigation } from './entity/navigation.entity';

@Injectable()
export class NavigationService {
    constructor(@InjectRepository(Navigation) private readonly navigationRepository: Repository<Navigation>) { }

    async findAll(): Promise<Navigation[]> {
        return await this.navigationRepository.find();
    }

    async findOne(id: string): Promise<Navigation> {
        return this.navigationRepository.findOne(id);
        // const navigation = await this.navigationModel.findOne({ _id: id }).exec();
        // if (!navigation) {
        //     throw new NotFoundException(`navigation with ${id} not exists!`);
        // }
        // return navigation;
    }

    async create(createNavigationDto: CreateNavigationDto): Promise<Navigation> {
        return await this.navigationRepository.save(createNavigationDto)
    }

    async delete(id: string): Promise<void> {
        await this.navigationRepository.delete(id);
        // return await this.navigationModel.findByIdAndRemove(id).catch(() => {
        //     throw new HttpException("Can't delete navigation", HttpStatus.INTERNAL_SERVER_ERROR);
        // });

    }

    // async update(id: string, createNavigationDto: CreateNavigationDto): Promise<NavigationItem> {
    //     return await this.navigationModel.findByIdAndUpdate(id, createNavigationDto, { new: true }).catch(() => {
    //         throw new HttpException("Can't update navigation",HttpStatus.INTERNAL_SERVER_ERROR);
    //     });
    // }
}
