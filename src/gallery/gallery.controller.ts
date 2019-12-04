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
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { GalleryService } from './gallery.service';
import { Gallery } from './interfaces/gallery.interface';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { AuthGuard } from '@nestjs/passport';

@Controller('gallery')
export class GalleryController {
    constructor(private readonly galleryService: GalleryService) { }

    @Get()
    findAll(): Promise<Gallery[]> {
        return this.galleryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ValidateObjectId()) id): Promise<Gallery> {
        return this.galleryService.findOne(id);
    }

    // @UseGuards(AuthGuard())
    @Post()
    create(@Body() createGalleryDto: CreateGalleryDto): Promise<Gallery> {
        return this.galleryService.create(createGalleryDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Gallery> {
        return this.galleryService.delete(id);
    }

    @Put(':id')
    update(@Body() updateGalleryDto: CreateGalleryDto, @Param('id') id): Promise<Gallery> {
        return this.galleryService.update(id, updateGalleryDto);
    }
}
