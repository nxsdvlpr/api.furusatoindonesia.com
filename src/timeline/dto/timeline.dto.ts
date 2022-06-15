import {
  FilterableField,
  IDField,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType('Timeline')
@QueryOptions({ enableTotalCount: true })
export class TimelineDto {
  @IDField(() => ID)
  id: number;

  @FilterableField()
  takenAt: Date;

  @FilterableField()
  mediaId: string;

  @FilterableField()
  mediaCode: string;

  @FilterableField()
  caption: string;

  @FilterableField(() => GraphQLJSON)
  url: string;

  @FilterableField(() => GraphQLJSON, { nullable: true })
  tags: string;
}
