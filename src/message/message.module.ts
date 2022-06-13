import { CommonService } from 'src/common/common.service';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from './message.entity';
import { MessageDto } from './dto/message.dto';
import { MessageSeeder } from './message.seeder';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { MessageController } from './message.controller';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Message])],
      services: [MessageService],
      resolvers: [
        {
          DTOClass: MessageDto,
          CreateDTOClass: CreateMessageInput,
          UpdateDTOClass: UpdateMessageInput,
          EntityClass: Message,
          ServiceClass: MessageService,
          enableAggregate: true,
          create: {
            disabled: true,
          },
          update: {
            disabled: true,
          },
        },
      ],
    }),
    TypeOrmModule.forFeature([Message]),
  ],
  controllers: [MessageController],
  providers: [MessageResolver, MessageSeeder, CommonService],
  exports: [TypeOrmModule, NestjsQueryGraphQLModule],
})
export class MessageModule {}
