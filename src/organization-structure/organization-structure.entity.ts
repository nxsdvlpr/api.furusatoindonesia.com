import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OrganizationPeople } from 'src/organization-people/organization-people.entity';

@Entity()
export class OrganizationStructure {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => OrganizationPeople,
    (organizationOrganizationPeople) =>
      organizationOrganizationPeople.organization,
  )
  peoples!: OrganizationPeople[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  subject: string;

  @Column()
  description: string;

  @Column()
  sequence: number;
}
