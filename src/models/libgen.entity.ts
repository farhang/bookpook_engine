import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("updated")
export class LibgenEntity {
  @PrimaryGeneratedColumn()
  ID: string;

  @Column()
  MD5: string;

  @Column()
  Coverurl: string;

  @Column()
  Title: string;
}
