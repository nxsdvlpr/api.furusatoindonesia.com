import { IDField } from '@nestjs-query/query-graphql';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUppercase } from 'class-validator';

@InputType()
export class ArticleInput {
  @IDField(() => ID)
  id: number;

  @Field()
  group: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  titleJa?: string;

  @Field({ nullable: true })
  subtitle?: string;

  @Field({ nullable: true })
  subtitleJa?: string;

  @Field({ nullable: true })
  excerpt?: string;

  @Field({ nullable: true })
  excerptJa?: string;

  @Field({ nullable: true })
  body?: string;

  @Field({ nullable: true })
  bodyJa?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  icon?: string;

  @Field({ nullable: true })
  counter?: number;

  @Field({ nullable: true })
  published?: boolean;

  @Field({ nullable: true })
  sequence?: number;
}
