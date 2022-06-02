import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { OrganizationStructure } from './organization-structure.entity';

@Injectable()
export class OrganizationStructureSeeder implements Seeder {
  constructor(
    @InjectRepository(OrganizationStructure)
    private readonly organizationStructureRepository: Repository<OrganizationStructure>,
  ) {}

  async seed(): Promise<any> {
    const organizationStructures = [];

    await this.organizationStructureRepository.save(organizationStructures);
  }

  async drop(): Promise<any> {
    await this.organizationStructureRepository.clear();
  }
}
