import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Voucher } from './voucher.entity';

@Injectable()
export class VoucherSeeder implements Seeder {
  constructor(
    @InjectRepository(Voucher)
    private readonly repo: Repository<Voucher>,
  ) {}

  async seed(): Promise<any> {
    const vouchers = [];
    for (let i = 1; i <= 40; i++) {
      const num = i.toString().padStart(2, '0');
      vouchers.push({
        code: `VERO${num}`,
        value: i * 100000,
      });
    }
    await this.repo.save(vouchers);
  }

  async drop(): Promise<any> {
    await this.repo.clear();
  }
}
