import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Announcement } from './interfaces/announcements.interface';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AnnouncementsService {
    constructor(@InjectModel('Announcement') private readonly announcementModel: Model<Announcement>) { }

    async findAll(): Promise<Announcement[]> {
        return await this.announcementModel.find().populate('author','-password').exec();
    }

    async findOne(id: string): Promise<Announcement> {
        let announcement = await this.announcementModel.findOne({ _id: id }).populate('author','-password').exec();
        if (!announcement) {
            throw new NotFoundException(`Announcement with ${id} not exists!`);
        }
        return announcement;
    }

    async create(createAnnouncementDto: CreateAnnouncementDto): Promise<Announcement> {
        const newannouncement = new this.announcementModel(createAnnouncementDto);
        return await newannouncement.save();
    }

    async delete(id: string): Promise<Announcement> {
        return await this.announcementModel.findByIdAndRemove(id).catch(() => {
            throw new HttpException("Can't delete announcement",HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    async update(id: string, createAnnouncementDto: CreateAnnouncementDto): Promise<Announcement> {
        return await this.announcementModel.findByIdAndUpdate(id, createAnnouncementDto, { new: true }).catch(() => {
            throw new HttpException("Can't update announcement",HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
}
