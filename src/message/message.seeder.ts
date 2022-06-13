import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessageSeeder implements Seeder {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async seed(): Promise<any> {
    const messages = [];

    await this.messageRepository.save(messages);
  }

  async drop(): Promise<any> {
    await this.messageRepository.clear();
  }
}
