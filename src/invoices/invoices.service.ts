import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Invoice } from './interfaces/invoice.interface';
import { CreateInvoicetDto } from './dto/create-invoice.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class InvoicesService {
    constructor(@InjectModel('Invoice') private readonly invoiceModel: Model<Invoice>) { }

    async findAll(): Promise<Invoice[]> {
        return await this.invoiceModel.find().populate('owner', '-password').populate('diler', '-password').populate('comments.author', '-password').exec();
    }

    async findOne(id: string): Promise<Invoice> {
        // let car = await this.carModel.findOne({ _id: id }).populate('owner').populate('diler').populate('comments.author').exec().catch((err) => {
        //     console.log(err);
        //     return false
        // })
        let invoice = await this.invoiceModel.findOne({ _id: id }).populate('owner', '-password').populate('diler', '-password').populate('comments.author', '-password').exec();
        if (!invoice) {
            throw new NotFoundException(`Invoice with ${id} not exists!`);
        }
        return invoice;
    }

    async create(createInvoicetDto: CreateInvoicetDto): Promise<Invoice> {
        const newinvoice = new this.invoiceModel(createInvoicetDto);
        return await newinvoice.save();
    }

    async delete(id: string): Promise<Invoice> {
        return await this.invoiceModel.findByIdAndRemove(id).catch(() => {
            throw new HttpException("Can't delete Invoice",HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    async update(id: string, createInvoicetDto: CreateInvoicetDto): Promise<Invoice> {
        return await this.invoiceModel.findByIdAndUpdate(id, createInvoicetDto, { new: true }).catch(() => {
            throw new HttpException("Can't update invoice",HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
}
