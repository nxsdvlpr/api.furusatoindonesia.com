import {
  FilterableField,
  FilterableRelation,
  IDField,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { TradeinDto } from 'src/tradein/dto/tradein.dto';

@ObjectType('TradeinPhoto')
@FilterableRelation('tradein', () => TradeinDto, {
  disableRemove: true,
})
@QueryOptions({ enableTotalCount: true })
export class TradeinPhotoDto {
  @IDField(() => ID)
  id: number;

  @FilterableField(() => ID)
  tradeinId: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @FilterableField()
  url: string;
}
