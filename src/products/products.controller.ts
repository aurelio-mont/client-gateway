import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { identity } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_MICRO_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_MICRO_SERVICE) private readonly productsClient: ClientProxy,
  ) {}
  
  @Post()
  create() {
    return 'This action adds a new product';
  }

  @Get()
  findAll(@Query()paginationDto: PaginationDto) {
    return  this.productsClient.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return 'This action returns a product #id '+id;
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any
  ) {
    return 'This action updates a product #id '+id +' with body '+JSON.stringify(body);
  }
  
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return 'This action removes a product #id '+id;
  }

}
