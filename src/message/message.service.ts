import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { QueryService } from '@nestjs-query/core';
import { Repository } from 'typeorm';
import { assign } from 'lodash';

import { Message } from './message.entity';
import { UpdateMessageInput } from './dto/update-message.input';
import { CreateMessageInput } from './dto/create-message.input';

@QueryService(Message)
export class MessageService extends TypeOrmQueryService<Message> {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {
    super(messageRepository);
  }

  async create(input: CreateMessageInput): Promise<Message> {
    const message = Object.assign(new Message(), input);

    return this.messageRepository.save(message);
  }

  async update(input: UpdateMessageInput): Promise<Message> {
    const message = await this.messageRepository.findOne(input.id);

    if (!message) {
      throw new NotFoundException(
        `Unable to find Message with id: ${input.id}`,
      );
    }

    assign(message, input.update);
    await this.messageRepository.save(message);

    return message;
  }
}
