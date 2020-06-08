import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { NavItem } from './interfaces/navitem.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NavItemsService {
    constructor(@InjectModel('Navitem') private readonly navItemtModel: Model<NavItem>) { }

    async findAll(): Promise<NavItem[]> {
        return await this.navItemtModel.find();
    }

    // async findOne(id: string): Promise<Comment> {
    //     let comment = await this.commentModel.findOne({ _id: id }).populate('author','-password').exec();
    //     if (!comment) {
    //         throw new NotFoundException(`Comment with ${id} not exists!`);
    //     }
    //     return comment;
    // }

    async create(navItem: NavItem): Promise<NavItem> {
        const newNavItem = new this.navItemtModel(navItem);
        return await newNavItem.save().catch((err) => {
            console.log('ooooooooooooooooooooooooooo')
            throw new HttpException("Can't delete comment",HttpStatus.INTERNAL_SERVER_ERROR);
        })
    }

    // async delete(id: string): Promise<Comment> {
    //     return await this.commentModel.findByIdAndRemove(id).catch(() => {
    //         throw new HttpException("Can't delete comment",HttpStatus.INTERNAL_SERVER_ERROR);
    //     });
    // }

    // async update(id: string, comment: Comment): Promise<Comment> {
    //     return await this.commentModel.findByIdAndUpdate(id, comment, { new: true }).catch(() => {
    //         throw new HttpException("Can't update comment",HttpStatus.INTERNAL_SERVER_ERROR);
    //     });
    // }
}
