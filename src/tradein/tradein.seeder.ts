import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Tradein } from './tradein.entity';

@Injectable()
export class TradeinSeeder implements Seeder {
  constructor(
    @InjectRepository(Tradein)
    private readonly repo: Repository<Tradein>,
  ) {}

  async seed(): Promise<any> {
    const tradeins = DataFactory.createForClass(Tradein).generate(50);
    await this.repo.save(tradeins);
  }

  async drop(): Promise<any> {
    await this.repo.clear();
  }
}
