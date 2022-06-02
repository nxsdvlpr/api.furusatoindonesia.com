import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { OrganizationStructureInput } from './organization-structure.input';

@InputType()
export class UpdateOrganizationStructureData extends PartialType(
  OrganizationStructureInput,
) {}

@InputType()
export class UpdateOrganizationStructureInput {
  @Field(() => ID)
  id: number;

  @Field(() => UpdateOrganizationStructureData)
  @Type(() => UpdateOrganizationStructureData)
  @ValidateNested()
  update: UpdateOrganizationStructureData;
}
