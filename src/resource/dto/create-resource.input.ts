import { InputType, OmitType } from '@nestjs/graphql';
import { ResourceInput } from './resource.input';

@InputType()
export class CreateResourceInput extends OmitType(ResourceInput, [
  'id',
  'slug',
] as const) {}
