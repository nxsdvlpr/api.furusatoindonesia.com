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

  @FilterableField({ nullable: true })
  subjectJp: string;

  @FilterableField()
  excerpt: string;

  @FilterableField({ nullable: true })
  excerptJp: string;

  @FilterableField()
  body: string;

  @FilterableField({ nullable: true })
  bodyJp: string;

  @FilterableField({ nullable: true })
  image: string;

  @FilterableField({ nullable: true })
  file: string;

  @FilterableField({ nullable: true })
  videoUrl: string;

  @FilterableField()
  published: boolean;

  @FilterableField(() => GraphQLISODateTime)
  publishedAt: Date;
}
