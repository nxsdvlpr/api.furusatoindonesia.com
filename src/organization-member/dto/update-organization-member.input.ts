import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { OrganizationMemberInput } from './organization-member.input';

@InputType()
export class UpdateOrganizationMemberData extends PartialType(
  OrganizationMemberInput,
) {}

@InputType()
export class UpdateOrganizationMemberInput {
  @Field(() => ID)
  id: number;

  @Field(() => UpdateOrganizationMemberData)
  @Type(() => UpdateOrganizationMemberData)
  @ValidateNested()
  update: UpdateOrganizationMemberData;
}
