import { IsNotEmpty, IsString, MinLength, MaxLength, IsNumber } from "class-validator";

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  // @MinLength(1)
  @MaxLength(20)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNumber()
  readonly qty: number;
}
