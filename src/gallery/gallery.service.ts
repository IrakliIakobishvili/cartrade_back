import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Gallery } from './interfaces/gallery.interface';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GalleryService {
    constructor(@InjectModel('Gallery') private readonly galleryModel: Model<Gallery>) { }

    async findAll(): Promise<Gallery[]> {
        return await this.galleryModel.find().populate('author','-password').exec();
    }

    async findOne(id: string): Promise<Gallery> {
        let gallery = await this.galleryModel.findOne({ _id: id }).populate('author','-password').exec();
        if (!gallery) {
            throw new NotFoundException(`gallery with ${id} not exists!`);
        }
        return gallery;
    }

    async create(createGalleryDto: CreateGalleryDto): Promise<Gallery> {
        const newGallery = new this.galleryModel(createGalleryDto);
        return await newGallery.save();
    }

    async delete(id: string): Promise<Gallery> {
        return await this.galleryModel.findByIdAndRemove(id).catch(() => {
            throw new HttpException("Can't delete gallery", HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    async update(id: string, createGalleryDto: CreateGalleryDto): Promise<Gallery> {
        return await this.galleryModel.findByIdAndUpdate(id, createGalleryDto, { new: true }).catch(() => {
            throw new HttpException("Can't update gallery",HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
}
