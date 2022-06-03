import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column({ nullable: true })
  valueJp: string;

  @Column()
  type: string;
}
