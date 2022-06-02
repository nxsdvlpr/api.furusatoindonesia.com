import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateOrganizationPeopleInput } from './dto/create-organization-people.input';
import { OrganizationPeopleDto } from './dto/organization-people.dto';
import { UpdateOrganizationPeopleInput } from './dto/update-organization-people.input';
import { OrganizationPeopleService } from './organization-people.service';

@Resolver(() => OrganizationPeopleDto)
export class OrganizationPeopleResolver {
  constructor(
    private readonly organizationOrganizationPeopleService: OrganizationPeopleService,
  ) {}

  @Mutation(() => OrganizationPeopleDto)
  async createOrganizationPeople(
    @Args('input') input: CreateOrganizationPeopleInput,
  ): Promise<OrganizationPeopleDto> {
    return this.organizationOrganizationPeopleService.create(input);
  }

  @Mutation(() => OrganizationPeopleDto)
  async updateOrganizationPeople(
    @Args('input') input: UpdateOrganizationPeopleInput,
  ): Promise<OrganizationPeopleDto> {
    return this.organizationOrganizationPeopleService.update(input);
  }
}
