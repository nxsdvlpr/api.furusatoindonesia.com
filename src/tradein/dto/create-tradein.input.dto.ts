import { Field, InputType, OmitType } from '@nestjs/graphql';
import { TradeinPhotoTradeinInput } from './tradein-photo-tradein.input';
import { TradeinInput } from './tradein.input.dto';

@InputType()
export class CreateTradeinInput extends OmitType(TradeinInput, [] as const) {
  @Field(() => [TradeinPhotoTradeinInput], { nullable: true })
  photos?: TradeinPhotoTradeinInput[];
}
