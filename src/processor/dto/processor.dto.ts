import {
  FilterableField,
  FilterableUnPagedRelation,
  IDField,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { TradeinDto } from 'src/tradein/dto/tradein.dto';

@ObjectType('Processor')
@QueryOptions({ enableTotalCount: true })
@FilterableUnPagedRelation('tradeins', () => TradeinDto, {
  disableRemove: true,
})
export class ProcessorDto {
  @IDField(() => ID)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @FilterableField()
  name: string;

  @FilterableField()
  acerCashbackAmount: number;

  @FilterableField()
  otherCashbackAmount: number;
}
