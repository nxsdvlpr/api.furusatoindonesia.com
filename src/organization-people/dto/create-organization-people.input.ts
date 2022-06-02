import { InputType, OmitType } from '@nestjs/graphql';
import { OrganizationPeopleInput } from './organization-people.input';

@InputType()
export class CreateOrganizationPeopleInput extends OmitType(
  OrganizationPeopleInput,
  ['id'] as const,
) {}
