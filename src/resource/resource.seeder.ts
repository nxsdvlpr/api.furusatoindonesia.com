import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Resource } from './resource.entity';

@Injectable()
export class ResourceSeeder implements Seeder {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
  ) {}

  async seed(): Promise<any> {
    const resources = [];

    await this.resourceRepository.save(resources);
  }

  async drop(): Promise<any> {
    await this.resourceRepository.clear();
  }
}
