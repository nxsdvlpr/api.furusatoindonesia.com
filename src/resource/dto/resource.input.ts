import { IDField } from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ResourceInput {
  @IDField(() => ID)
  id: number;

  @Field()
  slug: string;

  @Field()
  subject: string;

  @Field({ nullable: true })
  subjectJp: string;

  @Field()
  excerpt: string;

  @Field({ nullable: true })
  excerptJp: string;

  @Field()
  body: string;

  @Field({ nullable: true })
  bodyJp: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  file: string;

  @Field({ nullable: true })
  videoUrl: string;

  @Field()
  published: boolean;

  @Field(() => GraphQLISODateTime)
  publishedAt: Date;
}
