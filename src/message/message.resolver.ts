import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateMessageInput } from './dto/create-message.input';
import { MessageDto } from './dto/message.dto';
import { UpdateMessageInput } from './dto/update-message.input';
import { MessageService } from './message.service';

@Resolver(() => MessageDto)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => MessageDto)
  async createMessage(
    @Args('input') input: CreateMessageInput,
  ): Promise<MessageDto> {
    return this.messageService.create(input);
  }

  @Mutation(() => MessageDto)
  async updateMessage(
    @Args('input') input: UpdateMessageInput,
  ): Promise<MessageDto> {
    return this.messageService.update(input);
  }
}
