import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Comment } from './interfaces/comment.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentsService {
    constructor(@InjectModel('Comment') private readonly commentModel: Model<Comment>) { }

    async findAll(): Promise<Comment[]> {
        // return await this.commentModel.find().populate('author','-password').populate('car').exec();
        return await this.commentModel.find().populate('author','-password').exec();
    }

    async findOne(id: string): Promise<Comment> {
        let comment = await this.commentModel.findOne({ _id: id }).populate('author','-password').exec();
        if (!comment) {
            throw new NotFoundException(`Comment with ${id} not exists!`);
        }
        return comment;
    }

    async create(comment: Comment): Promise<Comment> {
        const newComment = new this.commentModel(comment);
        return await newComment.save();
    }

    async delete(id: string): Promise<Comment> {
        return await this.commentModel.findByIdAndRemove(id).catch(() => {
            throw new HttpException("Can't delete comment",HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    async update(id: string, comment: Comment): Promise<Comment> {
        return await this.commentModel.findByIdAndUpdate(id, comment, { new: true }).catch(() => {
            throw new HttpException("Can't update comment",HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
}
