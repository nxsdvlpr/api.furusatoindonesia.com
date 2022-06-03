import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OrganizationMember } from 'src/organization-member/organization-member.entity';
@Entity()
export class OrganizationStructure {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => OrganizationMember,
    (organizationMember) => organizationMember.organization,
  )
  members: OrganizationMember[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  subject: string;

  @Column({ nullable: true })
  subjectJp: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  descriptionJp: string;

  @Column()
  sequence: number;
}
