import { IDField } from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ID, InputType } from '@nestjs/graphql';

@InputType()
export class BlogInput {
  @IDField(() => ID)
  id: number;

  @Field()
  slug: string;

  @Field()
  subject: string;

  @Field()
  excerpt: string;

  @Field()
  body: string;

  @Field()
  published: boolean;

  @Field(() => GraphQLISODateTime)
  publishedAt: Date;
}
