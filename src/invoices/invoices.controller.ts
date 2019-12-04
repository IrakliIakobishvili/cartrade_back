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
import { CreateInvoicetDto } from './dto/create-invoice.dto';
import { InvoicesService } from './invoices.service';
import { Invoice } from './interfaces/invoice.interface';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { AuthGuard } from '@nestjs/passport';

@Controller('invoices')
export class InvoicesController {
    constructor(private readonly invoicesService: InvoicesService) { }

    @Get()
    findAll(): Promise<Invoice[]> {
        return this.invoicesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ValidateObjectId()) id): Promise<Invoice> {
        return this.invoicesService.findOne(id);
    }

    @UseGuards(AuthGuard())
    @Post()
    create(@Body() createInvoicetDto: CreateInvoicetDto): Promise<Invoice> {
        return this.invoicesService.create(createInvoicetDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Invoice> {
        return this.invoicesService.delete(id);
    }

    @Put(':id')
    update(@Body() updateInvoiceDto: CreateInvoicetDto, @Param('id') id): Promise<Invoice> {
        return this.invoicesService.update(id, updateInvoiceDto);
    }
}
