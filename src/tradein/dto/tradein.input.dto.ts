import { Field, ID, InputType } from '@nestjs/graphql';
import {
  TradeinBrand,
  TradeinCondition,
  TradeinStatus,
} from '../tradein.entity';

@InputType()
export class TradeinInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  address?: string;

  @Field(() => TradeinBrand)
  brand: TradeinBrand;

  @Field(() => ID)
  processorId: number;

  @Field(() => TradeinCondition)
  condition: TradeinCondition;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Date)
  pickupDate: Date;

  @Field(() => ID, { nullable: true })
  suggestedPartnerId?: number;

  @Field({ nullable: true })
  potentialVoucher: string;

  @Field({ nullable: true })
  potentialCashback: number;

  @Field({ nullable: true })
  voucherCode?: string;

  @Field(() => Date)
  expiredAt: Date;

  @Field(() => Date, { nullable: true })
  validatedAt?: Date;

  @Field(() => ID, { nullable: true })
  verifierUserId?: number;

  @Field(() => ID, { nullable: true })
  verifierPartnerId?: number;

  @Field(() => ID, { nullable: true })
  approvedVoucherId?: number;

  @Field({ nullable: true })
  note?: string;

  @Field({ nullable: true })
  shippingReceiptNo?: string;

  @Field(() => TradeinStatus)
  status: TradeinStatus;
}
