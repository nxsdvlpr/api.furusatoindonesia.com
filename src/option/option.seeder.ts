import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { Option } from './option.entity';

@Injectable()
export class OptionSeeder implements Seeder {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  async seed(): Promise<any> {
    const jsonFile = fs.readFileSync('./seeder/options.json', 'utf8');
    const data = JSON.parse(jsonFile);

    await this.optionRepository.save(data);
  }

  async drop(): Promise<any> {
    await this.optionRepository.clear();
  }
}
