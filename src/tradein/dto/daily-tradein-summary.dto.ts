import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('DaylyTradeinSummary')
export class DailyTradeinSummaryDto {
  @Field(() => String)
  date: string;

  @Field(() => Int)
  count: number;
}
