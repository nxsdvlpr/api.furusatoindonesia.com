import { InputType, OmitType } from '@nestjs/graphql';
import { OrganizationMemberInput } from './organization-member.input';

@InputType()
export class CreateOrganizationMemberInput extends OmitType(
  OrganizationMemberInput,
  ['id'] as const,
) {}
