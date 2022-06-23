import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import * as faker from 'faker';
import { assign } from 'lodash';

@Injectable()
export class MessageSeeder implements Seeder {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async seed(): Promise<any> {
    const data: Message[] = [];

    faker.locale = 'id_ID';
    for (let i = 0; i < 50; i++) {
      data.push(
        assign(new Message(), {
          fullname: `${faker.name.firstName()} ${faker.name.lastName()}`,
          email: faker.internet.email(),
          phone: faker.phone.phoneNumber('081#########'),
          body: faker.lorem.paragraph(),
          alreadyRead: faker.random.arrayElement([true, false]),
        }),
      );
    }

    await this.messageRepository.save(data);
  }

  async drop(): Promise<any> {
    await this.messageRepository.clear();
  }
}
