import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Processor } from './processor.entity';

@Injectable()
export class ProcessorSeeder implements Seeder {
  constructor(
    @InjectRepository(Processor)
    private readonly repo: Repository<Processor>,
  ) {}

  async seed(): Promise<any> {
    const cashbacks = [
      {
        name: 'Intel Core i7',
        acerCashbackAmount: 4000000,
        otherCashbackAmount: 3500000,
      },
      {
        name: 'Ryzen 7 series',
        acerCashbackAmount: 4000000,
        otherCashbackAmount: 3500000,
      },
      {
        name: 'Intel Core i5',
        acerCashbackAmount: 3000000,
        otherCashbackAmount: 2500000,
      },
      {
        name: 'Ryzen 5 series',
        acerCashbackAmount: 3000000,
        otherCashbackAmount: 2500000,
      },
      {
        name: 'Intel Core i3',
        acerCashbackAmount: 2000000,
        otherCashbackAmount: 1500000,
      },
      {
        name: 'Ryzen 3 series',
        acerCashbackAmount: 2000000,
        otherCashbackAmount: 1500000,
      },
      {
        name: 'Intel Celeron',
        acerCashbackAmount: 1000000,
        otherCashbackAmount: 500000,
      },
      {
        name: 'Intel Pentium',
        acerCashbackAmount: 1000000,
        otherCashbackAmount: 500000,
      },
      {
        name: 'AMD Athlon',
        acerCashbackAmount: 1000000,
        otherCashbackAmount: 500000,
      },
      {
        name: 'AMD 3020e',
        acerCashbackAmount: 1000000,
        otherCashbackAmount: 500000,
      },
      {
        name: 'AMD A12/A10/A9/A6/A4',
        acerCashbackAmount: 1000000,
        otherCashbackAmount: 500000,
      },
      {
        name: 'Any Condition',
        acerCashbackAmount: 500000,
        otherCashbackAmount: 0,
      },
    ];
    await this.repo.save(cashbacks);
  }

  async drop(): Promise<any> {
    await this.repo.clear();
  }
}
