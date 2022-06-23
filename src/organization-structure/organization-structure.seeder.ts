import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { OrganizationStructure } from './organization-structure.entity';
import * as faker from 'faker';
import { assign } from 'lodash';

@Injectable()
export class OrganizationStructureSeeder implements Seeder {
  constructor(
    @InjectRepository(OrganizationStructure)
    private readonly organizationStructureRepository: Repository<OrganizationStructure>,
  ) {}

  async seed(): Promise<any> {
    const data: OrganizationStructure[] = [];

    faker.locale = 'id_ID';
    for (let i = 0; i < 4; i++) {
      data.push(
        assign(new OrganizationStructure(), {
          subject: faker.name.jobTitle(),
          description: faker.random.words(10),
          sequence: i + 1,
        }),
      );
    }

    await this.organizationStructureRepository.save(data);
  }

  async drop(): Promise<any> {
    await this.organizationStructureRepository.clear();
  }
}
