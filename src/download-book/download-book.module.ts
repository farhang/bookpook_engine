import { Module } from '@nestjs/common';
import { DownloadBookService } from "./download-book.service";
import { DownloadBookController } from "./download-book.controller";
import { HttpModule } from "@nestjs/axios";
import { PuppeteerModule } from "nest-puppeteer";

@Module({
  imports: [HttpModule],
  providers: [DownloadBookService],
  controllers: [DownloadBookController],
})
export class DownloadBookModule
{}
