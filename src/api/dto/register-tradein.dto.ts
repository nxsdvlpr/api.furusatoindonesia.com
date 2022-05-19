import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { TradeinBrand, TradeinCondition } from 'src/tradein/tradein.entity';

export class RegisterTradeinDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  address?: string;

  @IsNotEmpty()
  @IsDateString()
  pickupDate: string;

  @IsOptional()
  suggestedPartnerId?: number;

  @IsNotEmpty()
  @IsEnum(TradeinBrand)
  brand: string;

  @IsNotEmpty()
  processorId: number;

  @IsNotEmpty()
  @IsEnum(TradeinCondition)
  condition: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  potentialCashback: number;
}
