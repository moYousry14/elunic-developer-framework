import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Post()
  async create(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productsService.create(productData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.productsService.delete(parseInt(id, 10));
  }
}
