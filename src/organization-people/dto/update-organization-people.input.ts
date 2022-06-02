import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { OrganizationPeopleInput } from './organization-people.input';

@InputType()
export class UpdateOrganizationPeopleData extends PartialType(
  OrganizationPeopleInput,
) {}

@InputType()
export class UpdateOrganizationPeopleInput {
  @Field(() => ID)
  id: number;

  @Field(() => UpdateOrganizationPeopleData)
  @Type(() => UpdateOrganizationPeopleData)
  @ValidateNested()
  update: UpdateOrganizationPeopleData;
}
