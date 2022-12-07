import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';

import { Park } from './park.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  park_id: number;

  @Column('int')
  duration: number;

  @Column({ type: 'boolean' })
  open: boolean;

  @ManyToOne(() => Park)
  @JoinColumn({ name: 'park_id' })
  park: Park;
}
