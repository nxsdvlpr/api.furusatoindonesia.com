import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Testimony } from './testimony.entity';
import * as faker from 'faker';
import { assign } from 'lodash';

@Injectable()
export class TestimonySeeder implements Seeder {
  constructor(
    @InjectRepository(Testimony)
    private readonly testimonyRepository: Repository<Testimony>,
  ) {}

  async seed(): Promise<any> {
    const data: Testimony[] = [];

    faker.locale = 'id_ID';
    for (let i = 0; i < 50; i++) {
      data.push(
        assign(new Testimony(), {
          fullname: `${faker.name.firstName()} ${faker.name.lastName()}`,
          profession: faker.name.jobTitle(),
          message: faker.lorem.paragraph(),
          avatar: 'https://loremflickr.com/75/75?' + i * 10,
        }),
      );
    }

    await this.testimonyRepository.save(data);
  }

  async drop(): Promise<any> {
    await this.testimonyRepository.clear();
  }
}
