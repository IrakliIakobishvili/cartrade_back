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
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { AnnouncementsService } from './announcements.service';
import { Announcement } from './interfaces/announcements.interface';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { AuthGuard } from '@nestjs/passport';

@Controller('announcements')
export class AnnouncementsController {
    constructor(private readonly announcementsService: AnnouncementsService) { }

    @Get()
    findAll(): Promise<Announcement[]> {
        return this.announcementsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ValidateObjectId()) id): Promise<Announcement> {
        return this.announcementsService.findOne(id);
    }

    @UseGuards(AuthGuard())
    @Post()
    create(@Body() createAnnouncementDto: CreateAnnouncementDto): Promise<Announcement> {
        return this.announcementsService.create(createAnnouncementDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Announcement> {
        return this.announcementsService.delete(id);
    }

    @Put(':id')
    update(@Body() updateCommentDto: CreateAnnouncementDto, @Param('id') id): Promise<Announcement> {
        return this.announcementsService.update(id, updateCommentDto);
    }
}
