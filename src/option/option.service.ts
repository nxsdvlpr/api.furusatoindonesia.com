import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { Option } from './option.entity';
import { UpdateOptionInput } from './dto/update-option.input.dto';

@QueryService(Option)
export class OptionService extends TypeOrmQueryService<Option> {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
  ) {
    super(optionRepository);
  }

  async updateOptions(input: UpdateOptionInput): Promise<any> {
    for (let index = 0; index < input.options.length; index++) {
      const element = input.options[index];
      await this.optionRepository.update(
        { name: element.name },
        { value: element.value, valueJp: element.valueJp },
      );
    }

    // for (const [key, value] of Object.entries(input.options)) {
    //   await this.optionRepository.update({ name: key }, { value });
    // }

    return input;
  }
}
