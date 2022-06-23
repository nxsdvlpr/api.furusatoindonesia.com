import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { OrganizationMember } from './organization-member.entity';
import * as faker from 'faker';
import { assign } from 'lodash';

@Injectable()
export class OrganizationMemberSeeder implements Seeder {
  constructor(
    @InjectRepository(OrganizationMember)
    private readonly organizationMemberRepository: Repository<OrganizationMember>,
  ) {}

  async seed(): Promise<any> {
    const data: OrganizationMember[] = [];

    faker.locale = 'id_ID';
    for (let i = 0; i < 20; i++) {
      data.push(
        assign(new OrganizationMember(), {
          organizationStructureId: faker.random.number({ min: 1, max: 4 }),
          fullname: `${faker.name.firstName()} ${faker.name.lastName()}`,
          profession: faker.name.jobTitle(),
          image: 'https://loremflickr.com/300/300?' + i * 10,
          sequence: i + 1,
        }),
      );
    }

    await this.organizationMemberRepository.save(data);
  }

  async drop(): Promise<any> {
    await this.organizationMemberRepository.clear();
  }
}
