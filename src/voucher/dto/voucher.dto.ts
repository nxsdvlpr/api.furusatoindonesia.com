import {
  FilterableField,
  FilterableUnPagedRelation,
  IDField,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { TradeinDto } from 'src/tradein/dto/tradein.dto';

@ObjectType('Voucher')
@QueryOptions({ enableTotalCount: true })
@FilterableUnPagedRelation('tradeins', () => TradeinDto, {
  disableRemove: true,
})
export class VoucherDto {
  @IDField(() => ID)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @FilterableField()
  code: string;

  @FilterableField()
  value: number;
}
