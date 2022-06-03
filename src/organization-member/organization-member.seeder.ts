import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { OrganizationMember } from './organization-member.entity';

@Injectable()
export class OrganizationMemberSeeder implements Seeder {
  constructor(
    @InjectRepository(OrganizationMember)
    private readonly organizationMemberRepository: Repository<OrganizationMember>,
  ) {}

  async seed(): Promise<any> {
    const organizationMembers = [];

    await this.organizationMemberRepository.save(organizationMembers);
  }

  async drop(): Promise<any> {
    await this.organizationMemberRepository.clear();
  }
}
