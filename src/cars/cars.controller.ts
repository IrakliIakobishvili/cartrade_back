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
import { CreateCarDto } from './dto/create-car.dto';
import { CarsService } from './cars.service';
import { Car } from './interfaces/car.interface';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { AuthGuard } from '@nestjs/passport';

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) { }

    @Get()
    findAll(): Promise<Car[]> {
        return this.carsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ValidateObjectId()) id): Promise<Car> {
        return this.carsService.findOne(id);
    }

    // @UseGuards(AuthGuard())
    @Post()
    create(@Body() createCarDto: CreateCarDto): Promise<Car> {
        return this.carsService.create(createCarDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Car> {
        return this.carsService.delete(id);
    }

    @Put(':id')
    update(@Body() updateCarDto: CreateCarDto, @Param('id') id): Promise<Car> {
        return this.carsService.update(id, updateCarDto);
    }
}
