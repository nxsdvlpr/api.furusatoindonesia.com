import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class TradeinPhotoInput {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => ID)
  tradeinId: number;

  @Field()
  url: string;
}
