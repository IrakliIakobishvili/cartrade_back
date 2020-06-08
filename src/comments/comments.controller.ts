import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpCode,
    UseGuards
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';
import { Comment } from './interfaces/comment.interface';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Get()
    findAll(): Promise<Comment[]> {
        return this.commentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ValidateObjectId()) id): Promise<Comment> {
        return this.commentsService.findOne(id);
    }

    // @UseGuards(AuthGuard())
    @Post()
    create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
        return this.commentsService.create(createCommentDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Comment> {
        return this.commentsService.delete(id);
    }

    @Put(':id')
    update(@Body() updateCommentDto: CreateCommentDto, @Param('id') id): Promise<Comment> {
        return this.commentsService.update(id, updateCommentDto);
    }
}
