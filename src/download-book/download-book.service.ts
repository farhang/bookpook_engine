import { Injectable, Logger, StreamableFile } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Observable } from "rxjs";
import axios, { AxiosResponse } from "axios";
import puppeteer from "puppeteer";
import * as fs from "fs";
import { createWriteStream } from "fs";

@Injectable()
export class DownloadBookService {
  constructor(
    private readonly httpService: HttpService
) {
  }
  private readonly logger = new Logger(DownloadBookService.name);
  async downloadBook(md5: string, extension: string, res: Response) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://libgen.li/ads' + md5);
    const elem = await page.$$eval("#main > tbody > tr:nth-child(1) > td:nth-child(2) > a", el => el.map(x => x.getAttribute("href")));
    let url = elem[0];
    const name = +new Date();
    const writer = createWriteStream(`${name}.${extension}`);
    let response = await this.httpService.axiosRef(url, {
      responseType: 'stream',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    /*console.log(response);
    fs.writeFile( `${__dirname}/${name}.${extension}`, response.data, (err) => {
      if (err) throw err;
      console.log('Image downloaded successfully!');
    });*/

    await browser.close();
    response.data.pipe(res);


    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  }

}
