import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateTestimonyInput } from './dto/create-testimony.input';
import { TestimonyDto } from './dto/testimony.dto';
import { UpdateTestimonyInput } from './dto/update-testimony.input';
import { TestimonyService } from './testimony.service';

@Resolver(() => TestimonyDto)
export class TestimonyResolver {
  constructor(private readonly testimonyService: TestimonyService) {}

  @Mutation(() => TestimonyDto)
  async createTestimony(
    @Args('input') input: CreateTestimonyInput,
  ): Promise<TestimonyDto> {
    return this.testimonyService.create(input);
  }

  @Mutation(() => TestimonyDto)
  async updateTestimony(
    @Args('input') input: UpdateTestimonyInput,
  ): Promise<TestimonyDto> {
    return this.testimonyService.update(input);
  }
}
