import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { OrganizationPeople } from './organization-people.entity';

@Injectable()
export class OrganizationPeopleSeeder implements Seeder {
  constructor(
    @InjectRepository(OrganizationPeople)
    private readonly organizationOrganizationPeopleRepository: Repository<OrganizationPeople>,
  ) {}

  async seed(): Promise<any> {
    const organizationOrganizationPeoples = [];

    await this.organizationOrganizationPeopleRepository.save(
      organizationOrganizationPeoples,
    );
  }

  async drop(): Promise<any> {
    await this.organizationOrganizationPeopleRepository.clear();
  }
}
