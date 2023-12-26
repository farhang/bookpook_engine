import { Controller, Get, Param } from "@nestjs/common";
import { BookService } from "./book.service";

@Controller('book')
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
