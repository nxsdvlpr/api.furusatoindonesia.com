import {
  FilterableField,
  FilterableRelation,
  IDField,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { UserDto } from 'src/user/dto/user.dto';

@ObjectType('Blog')
@QueryOptions({ enableTotalCount: true })
@FilterableRelation('user', () => UserDto, {
  disableRemove: true,
  nullable: true,
})
export class BlogDto {
  @IDField(() => ID)
  id: number;

  @FilterableField(() => ID)
  userId: number;

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
