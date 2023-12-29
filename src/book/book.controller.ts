import { Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { BookService } from "./book.service";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { CacheTTL } from "@nestjs/common/cache";

@Controller('book')
@UseInterceptors(CacheInterceptor)
@CacheTTL(600)

export class BookController {
  constructor(private bookService: BookService) {}

  @Get('md5/:MD5')
  getBookByMd5(@Param() params) {
    return this.bookService.getBookByMd5(params.MD5);
  }

  @Get('title/:title')
  getBookByTitle(@Param() params) {
    return this.bookService.getBookByTitle(params.title);
  }
}
