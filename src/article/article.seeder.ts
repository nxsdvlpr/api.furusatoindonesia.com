import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import * as fs from 'fs';
import * as faker from 'faker';
import { assign } from 'lodash';

@Injectable()
export class ArticleSeeder implements Seeder {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async seed(): Promise<any> {
    // Static articles
    const jsonFile = fs.readFileSync('./seeder/articles.json', 'utf8');
    const data = JSON.parse(jsonFile);
    await this.articleRepository.save(data);

    // Dynamic articles
    faker.locale = 'id_ID';

    const articles = [];

    for (let i = 0; i < 3; i++) {
      articles.push(
        assign(new Article(), {
          group: 'expertise',
          title: faker.random.words(5),
          subtitle: faker.random.words(10),
          body: faker.lorem.paragraph(),
          bodyJa: '',
          image: 'https://loremflickr.com/500/500?e' + i * 10,
          icon: 'icon-park-outline:people-speak',
          published: true,
          sequence: i + 1,
        }),
      );
    }

    for (let i = 0; i < 3; i++) {
      articles.push(
        assign(new Article(), {
          group: 'project',
          title: faker.random.words(5),
          subtitle: faker.random.words(10),
          body: faker.lorem.paragraph(),
          bodyJa: '',
          image: 'https://loremflickr.com/500/500?p' + i * 10,
          icon: 'icon-park-outline:leaf',
          published: true,
          sequence: i + 1,
        }),
      );
    }

    for (let i = 0; i < 3; i++) {
      articles.push(
        assign(new Article(), {
          group: 'impact',
          title: faker.random.words(5),
          body: faker.lorem.paragraph(),
          bodyJa: '',
          image: 'https://loremflickr.com/500/500?i' + i * 10,
          published: true,
          sequence: i + 1,
        }),
      );
    }

    for (let i = 0; i < 4; i++) {
      articles.push(
        assign(new Article(), {
          group: 'mission-vision',
          title: faker.random.words(3),
          body: faker.lorem.paragraph(),
          bodyJa: '',
          image: 'https://loremflickr.com/500/500?v' + i * 10,
          published: true,
          sequence: i + 1,
        }),
      );
    }

    for (let i = 0; i < 3; i++) {
      articles.push(
        assign(new Article(), {
          group: 'office',
          title: faker.address.city(),
          body: faker.address.streetAddress(),
          bodyJa: '',
          published: true,
          sequence: i + 1,
        }),
      );
    }

    for (let i = 0; i < 4; i++) {
      articles.push(
        assign(new Article(), {
          group: 'partner',
          title: faker.company.companyName(),
          image: 'https://loremflickr.com/184/100?pa' + i * 10,
          published: true,
          sequence: i + 1,
        }),
      );
    }

    await this.articleRepository.save(articles);
  }

  async drop(): Promise<any> {
    await this.articleRepository.clear();
  }
}
