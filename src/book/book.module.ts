import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from "./book.service";
import { BookController } from "./book.controller";
import { FictionEntity } from "../models/fiction.entity";
import { LibgenEntity } from "../models/libgen.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FictionEntity, LibgenEntity])],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
