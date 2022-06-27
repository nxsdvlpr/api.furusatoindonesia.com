import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  value: string;

  @Column({ nullable: true })
  valueJa: string;

  @Column()
  type: string;
}
