import { IsNotEmpty, IsString, IsDate, IsArray } from "class-validator";

export class CreateInvoicetDto {
    @IsNotEmpty()
    @IsString()
    readonly bill_to: string;

    @IsNotEmpty()
    @IsString()
    readonly send_to: string;

    @IsNotEmpty()
    @IsString()
    readonly invoice_id: any;

    @IsNotEmpty()
    @IsDate()
    readonly date: Date;

    @IsNotEmpty()
    @IsDate()
    readonly due_date: Date;

    @IsNotEmpty()
    @IsArray()
    readonly items: Array<any>;
}
