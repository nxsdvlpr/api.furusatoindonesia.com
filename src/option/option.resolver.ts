import { Args, Mutation, Resolver } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { OptionDto } from './dto/option.dto';
import { UpdateOptionInput } from './dto/update-option.input.dto';
import { OptionService } from './option.service';

@Resolver(() => OptionDto)
export class OptionResolver {
  constructor(private readonly optionService: OptionService) {}

  @Mutation(() => GraphQLJSON)
  async updateOptions(
    @Args('input', { type: () => UpdateOptionInput }) input: UpdateOptionInput,
  ): Promise<any> {
    return this.optionService.updateOptions(input);
  }
}
