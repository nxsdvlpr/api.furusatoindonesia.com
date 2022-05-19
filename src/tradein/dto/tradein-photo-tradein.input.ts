import { InputType, OmitType } from '@nestjs/graphql';
import { TradeinPhotoInput } from 'src/tradein-photo/dto/tradein-photo.input.dto';

@InputType()
export class TradeinPhotoTradeinInput extends OmitType(TradeinPhotoInput, [
  'tradeinId',
]) {}
