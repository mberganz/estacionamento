import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Park {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int'})
  number: number;

  @Column({ type: 'boolean', default: false })
  preferencial: boolean;

  @Column({ type: 'boolean', default: false })
  open: boolean;
}
