import { InputType, Field, ID, PartialType, OmitType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { TradeinPhotoTradeinInput } from './tradein-photo-tradein.input';
import { TradeinInput } from './tradein.input.dto';

@InputType()
export class UpdateTradeinData extends PartialType(OmitType(TradeinInput, [])) {
  @Field(() => [TradeinPhotoTradeinInput], { nullable: true })
  photos?: TradeinPhotoTradeinInput[];
}

@InputType()
export class UpdateTradeinInput {
  @Field(() => ID)
  id: number;

  @Field(() => UpdateTradeinData)
  @Type(() => UpdateTradeinData)
  @ValidateNested()
  update: UpdateTradeinData;
}
