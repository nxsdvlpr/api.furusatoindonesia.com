import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { QueryService } from '@nestjs-query/core';
import { Repository } from 'typeorm';
import { assign } from 'lodash';

import { OrganizationPeople } from './organization-people.entity';
import { UpdateOrganizationPeopleInput } from './dto/update-organization-people.input';
import { CreateOrganizationPeopleInput } from './dto/create-organization-people.input';

@QueryService(OrganizationPeople)
export class OrganizationPeopleService extends TypeOrmQueryService<OrganizationPeople> {
  constructor(
    @InjectRepository(OrganizationPeople)
    private organizationOrganizationPeopleRepository: Repository<OrganizationPeople>,
  ) {
    super(organizationOrganizationPeopleRepository);
  }

  async create(
    input: CreateOrganizationPeopleInput,
  ): Promise<OrganizationPeople> {
    const organizationOrganizationPeople = Object.assign(
      new OrganizationPeople(),
      input,
    );

    return this.organizationOrganizationPeopleRepository.save(
      organizationOrganizationPeople,
    );
  }

  async update(
    input: UpdateOrganizationPeopleInput,
  ): Promise<OrganizationPeople> {
    const organizationOrganizationPeople =
      await this.organizationOrganizationPeopleRepository.findOne(input.id);

    if (!organizationOrganizationPeople) {
      throw new NotFoundException(
        `Unable to find Organization OrganizationPeople with id: ${input.id}`,
      );
    }

    assign(organizationOrganizationPeople, input.update);
    await this.organizationOrganizationPeopleRepository.save(
      organizationOrganizationPeople,
    );

    return organizationOrganizationPeople;
  }
}
