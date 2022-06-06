import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';

import { CreateOrganizationStructureInput } from './dto/create-organization-structure.input';
import { OrganizationStructureDto } from './dto/organization-structure.dto';
import { UpdateOrganizationStructureInput } from './dto/update-organization-structure.input';
import { OrganizationStructureService } from './organization-structure.service';

@Resolver(() => OrganizationStructureDto)
export class OrganizationStructureResolver {
  constructor(
    private readonly organizationStructureService: OrganizationStructureService,
  ) {}

  @Mutation(() => OrganizationStructureDto)
  async createOrganizationStructure(
    @Args('input') input: CreateOrganizationStructureInput,
  ): Promise<OrganizationStructureDto> {
    return this.organizationStructureService.create(input);
  }

  @Mutation(() => OrganizationStructureDto)
  async updateOrganizationStructure(
    @Args('input') input: UpdateOrganizationStructureInput,
  ): Promise<OrganizationStructureDto> {
    return this.organizationStructureService.update(input);
  }

  @Mutation(() => OrganizationStructureDto)
  async changeSequenceOrganizationStructure(
    @Args('id', { type: () => ID }) id: number,
    @Args('direction') direction: string,
  ): Promise<OrganizationStructureDto> {
    return this.organizationStructureService.changeSequence(id, direction);
  }
}
