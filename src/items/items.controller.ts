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
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { AuthGuard } from '@nestjs/passport';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  // @UseGuards(AuthGuard())
  // @Get()
  // findAll(): Promise<Item[]> {
  //   return this.itemsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id', new ValidateObjectId()) id): Promise<Item> {
  //   return this.itemsService.findOne(id);
  // }

  // @Post()
  // // @UseGuards(AuthGuard())
  // // @HttpCode(201)
  // create(@Body() createItemDto: CreateItemDto): Promise<Item> {
  //   return this.itemsService.create(createItemDto);
  // }

  // @Delete(':id')
  // delete(@Param('id') id): Promise<Item> {
  //   return this.itemsService.delete(id);
  // }

  // @Put(':id')
  // update(@Body() updateItemDto: CreateItemDto, @Param('id') id): Promise<Item> {
  //   return this.itemsService.update(id, updateItemDto);
  // }
}
