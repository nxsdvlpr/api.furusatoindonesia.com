import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { MessageInput } from './message.input';

@InputType()
export class UpdateMessageData extends PartialType(MessageInput) {}

@InputType()
export class UpdateMessageInput {
  @Field(() => ID)
  id: number;

  @Field(() => UpdateMessageData)
  @Type(() => UpdateMessageData)
  @ValidateNested()
  update: UpdateMessageData;
}
