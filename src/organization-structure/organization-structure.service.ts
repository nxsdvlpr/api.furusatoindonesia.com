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

    const query = this.organizationStructureRepository
      .createQueryBuilder('organizationStructure')
      .select('MAX(organizationStructure.sequence)', 'maxSequence');

    const result = await query.getRawOne();

    organizationStructure.sequence = result.maxSequence + 1;

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

  async changeSequence(
    id: number,
    direction: string,
  ): Promise<OrganizationStructure> {
    const organizationOne = await this.organizationStructureRepository.findOne(
      id,
    );

    const organizationTwo = await this.organizationStructureRepository.findOne({
      sequence:
        direction === 'up'
          ? organizationOne.sequence - 1
          : organizationOne.sequence + 1,
    });

    const organizationOneSequence = organizationOne.sequence;
    const organizationTwoSequence = organizationTwo.sequence;

    if (!organizationOne || !organizationTwo) {
      return organizationOne;
    }

    organizationOne.sequence = organizationTwoSequence;
    const newOrganization = await this.organizationStructureRepository.save(
      organizationOne,
    );

    organizationTwo.sequence = organizationOneSequence;
    await this.organizationStructureRepository.save(organizationTwo);

    return newOrganization;
  }

  async list(): Promise<OrganizationStructure[]> {
    return this.organizationStructureRepository
      .createQueryBuilder('organization')
      .leftJoinAndSelect('organization.members', 'members')
      .select(['organization', 'members'])
      .orderBy({
        'organization.sequence': 'ASC',
        'members.sequence': 'ASC',
      })
      .getMany();
  }
}
