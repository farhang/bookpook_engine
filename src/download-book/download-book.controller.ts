import { Controller, Get, Param, Res } from "@nestjs/common";
import { DownloadBookService } from "./download-book.service";
import { HttpService } from "@nestjs/axios";
import puppeteer from 'puppeteer';

@Controller('download-book')
export class DownloadBookController {
  constructor(private downloadBookService: DownloadBookService,
              private readonly httpService: HttpService) {}


  @Get(':MD5/:Extension')
  async downloadBook(@Param('MD5') MD5, @Param('Extension') Extension, @Res() res: Response) {
      return this.downloadBookService.downloadBook(MD5, Extension, res);
  }
}
