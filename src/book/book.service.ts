import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from "typeorm";
import { FictionEntity } from "../models/fiction.entity";
import { LibgenEntity } from "../models/libgen.entity";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class BookService {
  constructor(
    //@InjectRepository(FictionEntity, 'FICTION_CONNECTION')
    //private fictionRepository: Repository<FictionEntity>,
    @Inject(CACHE_MANAGER) private cacheManager,
    @InjectRepository(LibgenEntity)
    private libgenRepository: Repository<LibgenEntity>,


  ) {}



  async getBookByMd5(md5: string): Promise<any> {
    return await this.libgenRepository.find({
      select: ["Title", "Coverurl", "Visible", "MD5", "Author", "Year", "Extension", "Language", "PagesInFile", "Filesize"],
      where: [{ "MD5": md5 }]
    });
  }

  async getFictionByTitle(title: string): Promise<any[]> {
    return await this.libgenRepository.find({
      select: ["Title"],
      where: [{ "Title": ILike(`%${title}%`) }]
    });
  }

  async getLibgenByTitle(title: string): Promise<any[]> {

    const response =  await this.libgenRepository.find({
      select: ["Title", "Coverurl", "MD5", "Author", "Year", "Extension", "Language", "PagesInFile", "Filesize", "Visible"],
      where: [{ "Title": ILike(`${title}%`) }]
    });

    return response;
  }

  async getBookByTitle(title: string): Promise<any> {
      //const fiction = await this.getFictionByTitle(title);
      const fiction = [];
      const libgen = await this.getLibgenByTitle(title);
      return {fiction: fiction, libgen: libgen, length: fiction.length + libgen.length};
  }
}
