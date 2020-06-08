import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param
} from '@nestjs/common';
import { CreateNavigationDto } from './dto/create-navigation.dto';
import { NavigationService } from './navigation.service';
// import { NavigationItem } from './interfaces/navigation.interface';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@Controller('navigation')
export class NavigationController {
    constructor(private readonly navigationService: NavigationService) { }

    @Get()
    findAll() {
        return this.navigationService.findAll();
    }

    // @Get(':id')
    // findOne(@Param('id', new ValidateObjectId()) id): Promise<NavigationItem> {
    //     return this.navigationService.findOne(id);
    // }

    @Post()
    create(@Body() createNavigationDto: CreateNavigationDto) {
        return this.navigationService.create(createNavigationDto);
    }

    // @Delete(':id')
    // delete(@Param('id') id): Promise<NavigationItem> {
    //     return this.navigationService.delete(id);
    // }

    // @Put(':id')
    // update(@Body() updateNavigationDto: CreateNavigationDto, @Param('id') id): Promise<NavigationItem> {
    //     return this.navigationService.update(id, updateNavigationDto);
    // }
}
