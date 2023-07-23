import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'file' })
export class UploadedFileEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  filename: string;

  @Column({ type: 'jsonb' })
  data: any;
}
