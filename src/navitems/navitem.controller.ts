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
import { CreateNavitemDto } from './dto/create-navitem.dto';
import { NavItemsService } from './navitem.service';
import { NavItem } from './interfaces/navitem.interface';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@Controller('navitems')
export class NavItemsController {
    constructor(private readonly navItemsService: NavItemsService) { }

    @Get()
    findAll(): Promise<NavItem[]> {
        return this.navItemsService.findAll();
    }

    // @Get(':id')
    // findOne(@Param('id', new ValidateObjectId()) id): Promise<NavItem> {
    //     return this.navItemsService.findOne(id);
    // }

    // @Post()
    // create(@Body() createNavItemDto: CreateNavitemDto): Promise<NavItem> {
    //     return this.navItemsService.create(createNavItemDto);
    // }

    // @Delete(':id')
    // delete(@Param('id') id): Promise<NavItem> {
    //     return this.navItemsService.delete(id);
    // }

    // @Put(':id')
    // update(@Body() updateNavItemDto: CreateNavItemDto, @Param('id') id): Promise<NavItem> {
    //     return this.commentsService.update(id, updateNavItemDto);
    // }
}
