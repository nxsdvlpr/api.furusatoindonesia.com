import { IDField } from '@nestjs-query/query-graphql';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class MessageInput {
  @IDField(() => ID)
  id: number;

  @Field()
  fullname: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  body: string;
}
