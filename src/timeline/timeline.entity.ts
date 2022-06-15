import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Timeline {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  takenAt: Date;

  @Column()
  mediaId: string;

  @Column()
  mediaCode: string;

  @Column()
  caption: string;

  @Column({ type: 'simple-json' })
  url: any;

  @Column({ type: 'simple-json', nullable: true })
  tags: any;
}
