import { InputType, OmitType } from '@nestjs/graphql';
import { TestimonyInput } from './testimony.input';

@InputType()
export class CreateTestimonyInput extends OmitType(TestimonyInput, [
  'id',
] as const) {}
