import {
  FilterableField,
  IDField,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Resource')
@QueryOptions({ enableTotalCount: true })
export class ResourceDto {
  @IDField(() => ID)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @FilterableField()
  slug: string;

  @FilterableField()
  subject: string;

  @FilterableField()
  excerpt: string;

  @FilterableField()
  body: string;

  @FilterableField()
  published: boolean;

  @Field(() => GraphQLISODateTime)
  publishedAt: Date;
}
