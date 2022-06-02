import { IDField } from '@nestjs-query/query-graphql';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ArticleInput {
  @IDField(() => ID)
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field()
  group: string;

  @Field()
  subject: string;

  @Field()
  excerpt: string;

  @Field({ nullable: true })
  body: string;

  @Field({ nullable: true })
  image: string;

  @Field()
  sequence: number;
}
