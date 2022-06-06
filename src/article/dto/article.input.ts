import { IDField } from '@nestjs-query/query-graphql';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ArticleInput {
  @IDField(() => ID)
  id: number;

  @Field()
  group: string;

  @Field({ nullable: true })
  slug: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  titleJp: string;

  @Field({ nullable: true })
  subtitle: string;

  @Field({ nullable: true })
  subtitleJp: string;

  @Field({ nullable: true })
  excerpt: string;

  @Field({ nullable: true })
  excerptJp: string;

  @Field({ nullable: true })
  body: string;

  @Field({ nullable: true })
  bodyJp: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  icon: string;

  @Field()
  sequence: number;
}
