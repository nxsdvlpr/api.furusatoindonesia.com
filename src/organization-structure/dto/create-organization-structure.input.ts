import { InputType, OmitType } from '@nestjs/graphql';
import { OrganizationStructureInput } from './organization-structure.input';

@InputType()
export class CreateOrganizationStructureInput extends OmitType(
  OrganizationStructureInput,
  ['id'] as const,
) {}
