import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateOrganizationMemberInput } from './dto/create-organization-member.input';
import { OrganizationMemberDto } from './dto/organization-member.dto';
import { UpdateOrganizationMemberInput } from './dto/update-organization-member.input';
import { OrganizationMemberService } from './organization-member.service';

@Resolver(() => OrganizationMemberDto)
export class OrganizationMemberResolver {
  constructor(
    private readonly organizationMemberService: OrganizationMemberService,
  ) {}

  @Mutation(() => OrganizationMemberDto)
  async createOrganizationMember(
    @Args('input') input: CreateOrganizationMemberInput,
  ): Promise<OrganizationMemberDto> {
    return this.organizationMemberService.create(input);
  }

  @Mutation(() => OrganizationMemberDto)
  async updateOrganizationMember(
    @Args('input') input: UpdateOrganizationMemberInput,
  ): Promise<OrganizationMemberDto> {
    return this.organizationMemberService.update(input);
  }
}
