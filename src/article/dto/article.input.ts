import { IDField } from '@nestjs-query/query-graphql';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ArticleInput {
  @IDField(() => ID)
  id: number;

  @Field()
  group: string;

  @Field()
  subject: string;

  @Field({ nullable: true })
  subjectJp: string;

  @Field()
  excerpt: string;

  @Field({ nullable: true })
  excerptJp: string;

  @Field({ nullable: true })
  body: string;

  @Field({ nullable: true })
  bodyJp: string;

  @Field({ nullable: true })
  image: string;

  @Field()
  sequence: number;
}
