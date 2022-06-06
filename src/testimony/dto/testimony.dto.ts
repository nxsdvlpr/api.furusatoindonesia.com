import {
  FilterableField,
  IDField,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Testimony')
@QueryOptions({ enableTotalCount: true })
export class TestimonyDto {
  @IDField(() => ID)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @FilterableField()
  fullname: string;

  @FilterableField()
  profession: string;

  @FilterableField()
  message: string;

  @FilterableField({ nullable: true })
  avatar: string;

  @FilterableField({ nullable: true })
  logo: string;
}
