import {
  FilterableField,
  IDField,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Option')
@QueryOptions({ enableTotalCount: true })
export class OptionDto {
  @IDField(() => ID)
  id: number;

  @FilterableField()
  name: string;

  @FilterableField()
  value: string;

  @FilterableField({ nullable: true })
  valueJp: string;

  @FilterableField()
  type: string;
}
