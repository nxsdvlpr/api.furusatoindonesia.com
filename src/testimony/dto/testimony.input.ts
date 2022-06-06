import { IDField } from '@nestjs-query/query-graphql';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class TestimonyInput {
  @IDField(() => ID)
  id: number;

  @Field()
  fullname: string;

  @Field()
  profession: string;

  @Field()
  message: string;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  logo: string;
}
