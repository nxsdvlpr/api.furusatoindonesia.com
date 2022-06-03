import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { QueryService } from '@nestjs-query/core';
import { Repository } from 'typeorm';
import { assign } from 'lodash';

import { OrganizationStructure } from './organization-structure.entity';
import { UpdateOrganizationStructureInput } from './dto/update-organization-structure.input';
import { CreateOrganizationStructureInput } from './dto/create-organization-structure.input';

@QueryService(OrganizationStructure)
export class OrganizationStructureService extends TypeOrmQueryService<OrganizationStructure> {
  constructor(
    @InjectRepository(OrganizationStructure)
    private organizationStructureRepository: Repository<OrganizationStructure>,
  ) {
    super(organizationStructureRepository);
  }

  async create(
    input: CreateOrganizationStructureInput,
  ): Promise<OrganizationStructure> {
    const organizationStructure = Object.assign(
      new OrganizationStructure(),
      input,
    );

    return this.organizationStructureRepository.save(organizationStructure);
  }

  async update(
    input: UpdateOrganizationStructureInput,
  ): Promise<OrganizationStructure> {
    const organizationStructure =
      await this.organizationStructureRepository.findOne(input.id);

    if (!organizationStructure) {
      throw new NotFoundException(
        `Unable to find Organization Structure with id: ${input.id}`,
      );
    }

    assign(organizationStructure, input.update);
    await this.organizationStructureRepository.save(organizationStructure);

    return organizationStructure;
  }
}
