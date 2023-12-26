import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("fiction")
export class FictionEntity {
  @PrimaryGeneratedColumn()
  MD5: string;

  @Column()
  Title: string;
}
