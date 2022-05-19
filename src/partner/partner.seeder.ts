import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Partner } from './partner.entity';

@Injectable()
export class PartnerSeeder implements Seeder {
  constructor(
    @InjectRepository(Partner)
    private readonly repo: Repository<Partner>,
  ) {}

  async seed(): Promise<any> {
    const partners = DataFactory.createForClass(Partner).generate(10);
    await this.repo.save(partners);
  }

  async drop(): Promise<any> {
    await this.repo.clear();
  }
}
