import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import * as faker from 'faker';
import { assign } from 'lodash';

@Injectable()
export class BlogSeeder implements Seeder {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async seed(): Promise<any> {
    const data: Blog[] = [];

    faker.locale = 'id_ID';
    for (let i = 0; i < 50; i++) {
      const date = new Date();
      date.setDate(date.getDate() - 1);

      data.push(
        assign(new Blog(), {
          userId: faker.random.number({ min: 1, max: 2 }),
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

    await this.blogRepository.save(
      data.map((item: Blog) => {
        const subject = `${item.subject} ${faker.random.alphaNumeric(8)}`;
        item.slug = faker.helpers.slugify(subject.toLowerCase());
        return item;
      }),
    );
  }

  async drop(): Promise<any> {
    await this.blogRepository.clear();
  }

  private capitalize(string: string): string {
    return string
      .toLowerCase()
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(' ');
  }
}
