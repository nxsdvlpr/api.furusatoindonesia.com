import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthenticatedUser } from 'src/auth/auth.interfaces';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CreateResourceInput } from './dto/create-resource.input';
import { ResourceDto } from './dto/resource.dto';
import { UpdateResourceInput } from './dto/update-resource.input';
import { ResourceService } from './resource.service';

@Resolver(() => ResourceDto)
export class ResourceResolver {
  constructor(private readonly resourceService: ResourceService) {}

  @Query(() => Boolean)
  async blogSlugExists(@Args('slug') slug: string): Promise<boolean> {
    return this.resourceService.slugExists(slug);
  }

  @Mutation(() => ResourceDto)
  async createResource(
    @Args('input') input: CreateResourceInput,
  ): Promise<ResourceDto> {
    return this.resourceService.create(input);
  }

  @Mutation(() => ResourceDto)
  async updateResource(
    @Args('input') input: UpdateResourceInput,
  ): Promise<ResourceDto> {
    return this.resourceService.update(input);
  }
}
