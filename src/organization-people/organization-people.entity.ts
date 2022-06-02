import { OrganizationStructure } from 'src/organization-structure/organization-structure.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class OrganizationPeople {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  organizationStructureId: number;

  @ManyToOne(
    () => OrganizationStructure,
    (organizationStructure) => organizationStructure.peoples,
    {
      onDelete: 'CASCADE',
      nullable: false,
      orphanedRowAction: 'delete',
    },
  )
  @JoinColumn({ name: 'organization_structure_id' })
  organization: OrganizationStructure;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  fullname: string;

  @Column()
  profession: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  sequence: number;
}
