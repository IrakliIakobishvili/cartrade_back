import { IsNotEmpty, IsString, MinLength, MaxLength, IsNumber, IsBoolean, IsArray } from "class-validator";

export class CreateNavigationDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  readonly  name: string;

  @IsNotEmpty()
  @IsString()
  readonly  url: string;

  @IsNotEmpty()
  @IsNumber()
  readonly  level: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly  active: boolean;

  @IsNotEmpty()
  @IsArray()
  readonly  children: Array<any>
}

