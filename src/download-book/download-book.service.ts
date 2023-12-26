import { Injectable, Logger, StreamableFile } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";
import puppeteer from "puppeteer";

@Injectable()
export class DownloadBookService {
  constructor(
    private readonly httpService: HttpService
) {
  }
  private readonly logger = new Logger(DownloadBookService.name);
  async downloadBook(md5: string, res: Response) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://libgen.li/ads' + md5);
    const elem = await page.$$eval("#main > tbody > tr:nth-child(1) > td:nth-child(2) > a", el => el.map(x => x.getAttribute("href")));
    let url = elem[0];
    let response = await this.httpService.axiosRef(url, {
      responseType: 'stream',
    });
    await browser.close();
    response.data.pipe(res);
  }

  async findBookByTitle(title: string) {

  }

}
