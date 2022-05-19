import { Field, ID, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { UpdateTradeinData } from './update-tradein.input.dto';

@InputType()
export class ValidateVoucherData {
  @Field(() => Date)
  expiredAt: Date;

  @Field(() => Date, { nullable: true })
  validatedAt?: Date;

  @Field(() => ID, { nullable: true })
  approvedVoucherId?: number;

  @Field({ nullable: true })
  note?: string;
}

@InputType()
export class ValidateVoucherInput {
  @Field(() => ID)
  id: number;

  @Field(() => ValidateVoucherData)
  @Type(() => ValidateVoucherData)
  @ValidateNested()
  update: UpdateTradeinData;
}
