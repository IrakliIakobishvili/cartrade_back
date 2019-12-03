import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnouncementsController } from './announcements.controller';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementSchema } from './schemas/announcement.schema';
import { AuthModule } from './../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Announcement', schema: AnnouncementSchema }]),
    AuthModule
  ],
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService],
})
export class AnnouncementsModule { }
