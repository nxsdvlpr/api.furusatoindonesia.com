import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { QueryService } from '@nestjs-query/core';
import { Repository } from 'typeorm';
import { assign } from 'lodash';

import { OrganizationMember } from './organization-member.entity';
import { UpdateOrganizationMemberInput } from './dto/update-organization-member.input';
import { CreateOrganizationMemberInput } from './dto/create-organization-member.input';

@QueryService(OrganizationMember)
export class OrganizationMemberService extends TypeOrmQueryService<OrganizationMember> {
  constructor(
    @InjectRepository(OrganizationMember)
    private organizationMemberRepository: Repository<OrganizationMember>,
  ) {
    super(organizationMemberRepository);
  }

  async create(
    input: CreateOrganizationMemberInput,
  ): Promise<OrganizationMember> {
    const organizationMember = Object.assign(new OrganizationMember(), input);

    return this.organizationMemberRepository.save(organizationMember);
  }

  async update(
    input: UpdateOrganizationMemberInput,
  ): Promise<OrganizationMember> {
    const organizationMember = await this.organizationMemberRepository.findOne(
      input.id,
    );

    if (!organizationMember) {
      throw new NotFoundException(
        `Unable to find Organization OrganizationMember with id: ${input.id}`,
      );
    }

    assign(organizationMember, input.update);
    await this.organizationMemberRepository.save(organizationMember);

    return organizationMember;
  }
}
