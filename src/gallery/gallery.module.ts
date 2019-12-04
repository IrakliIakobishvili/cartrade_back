import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { GallerySchema } from './schemas/gallery.schema';
import { AuthModule } from './../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Gallery', schema: GallerySchema }]),
    AuthModule
  ],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule { }
