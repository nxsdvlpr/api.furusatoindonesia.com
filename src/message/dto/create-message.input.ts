import { InputType, OmitType } from '@nestjs/graphql';
import { MessageInput } from './message.input';

@InputType()
export class CreateMessageInput extends OmitType(MessageInput, [
  'id',
] as const) {}
