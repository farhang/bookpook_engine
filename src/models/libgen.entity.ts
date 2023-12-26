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
  Author: string;

  @Column()
  Year: string;

  @Column()
  Extension: string;

  @Column()
  Title: string;

  @Column()
  Language: string;

  @Column()
  PagesInFile: number;

  @Column()
  Filesize: number;
}
