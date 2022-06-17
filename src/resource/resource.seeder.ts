import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Resource } from './resource.entity';

@Injectable()
export class ResourceSeeder implements Seeder {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
  ) {}

  async seed(): Promise<any> {
    const data = DataFactory.createForClass(Resource).generate(50);
    await this.resourceRepository.save(data);
  }

  async drop(): Promise<any> {
    await this.resourceRepository.clear();
  }
}
