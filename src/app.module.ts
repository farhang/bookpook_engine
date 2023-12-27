import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookModule } from './book/book.module';
import { DownloadBookModule } from "./download-book/download-book.module";
import { LibgenEntity } from "./models/libgen.entity";
import { ConfigModule } from "@nestjs/config";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: 'libgen_compact',
      entities: [LibgenEntity],
      synchronize: false,
    }),
    BookModule,
    DownloadBookModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
