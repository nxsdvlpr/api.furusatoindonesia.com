import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('TradeinSummary')
export class TradeinSummaryDto {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  todayRegistrationCount: number;

  @Field(() => Int)
  todayVerificationCount: number;
}
