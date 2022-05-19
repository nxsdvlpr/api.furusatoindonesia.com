import { IsNotEmpty, IsEnum } from 'class-validator';
import { TradeinBrand } from 'src/tradein/tradein.entity';

export class PotensialCasbackDto {
  @IsNotEmpty()
  processorId: number;

  @IsNotEmpty()
  @IsEnum(TradeinBrand)
  brand: string;
}
