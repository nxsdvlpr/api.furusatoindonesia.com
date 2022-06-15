import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Option } from './option.entity';

@Injectable()
export class OptionSeeder implements Seeder {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  async seed(): Promise<any> {
    const options = [
      {
        name: 'site_name',
        value: 'Furusato Indonesia',
        valueJa: null,
        type: 'varchar',
      },
      {
        name: 'site_title',
        value: 'Encourage local communities',
        valueJa: null,
        type: 'varchar',
      },
      {
        name: 'site_description',
        value:
          'We are here to participate in encouraging economic, social and cultural activities to strengthen competitiveness by optimizing the potential of local communities',
        valueJa: null,
        type: 'text',
      },
    ];

    await this.optionRepository.save(options);
  }

  async drop(): Promise<any> {
    await this.optionRepository.clear();
  }
}
