import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('desktop')
export class DesktopEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['file', 'folder'] })
  type: 'file' | 'folder'

  @Column({ nullable: true })
  parent_id: number | null;

  @Column({ default: 0 })
  size: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
