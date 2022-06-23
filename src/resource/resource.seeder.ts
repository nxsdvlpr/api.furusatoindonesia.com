import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Resource } from './resource.entity';
import * as faker from 'faker';
import { assign } from 'lodash';

@Injectable()
export class ResourceSeeder implements Seeder {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
  ) {}

  async seed(): Promise<any> {
    const data: Resource[] = [];

    faker.locale = 'id_ID';
    for (let i = 0; i < 50; i++) {
      const date = new Date();
      date.setDate(date.getDate() - 1);

      data.push(
        assign(new Resource(), {
          slug: '',
          subject: this.capitalize(faker.random.words(8)),
          excerpt: faker.lorem.paragraph(),
          body: faker.lorem.paragraph(5),
          image: 'https://loremflickr.com/500/500?' + i * 10,
          published: faker.random.arrayElement([true, false]),
          publishedAt: date,
        }),
      );
    }

    await this.resourceRepository.save(
      data.map((item: Resource) => {
        const subject = `${item.subject} ${faker.random.alphaNumeric(8)}`;
        item.slug = faker.helpers.slugify(subject.toLowerCase());
        return item;
      }),
    );
  }

  async drop(): Promise<any> {
    await this.resourceRepository.clear();
  }

  private capitalize(string: string): string {
    return string
      .toLowerCase()
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(' ');
  }
}
