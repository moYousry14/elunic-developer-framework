import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../entities/product.entity';
import { DataResponse } from '@elunic-workspace/api-interfaces';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<DataResponse<Product[]>> {
    const products = await this.productsService.findAll();
    return {
      data: products,
      meta: { total: products.length }
    };
  }

  @Post()
  async create(@Body() productData: Partial<Product>): Promise<DataResponse<Product>> {
    const product = await this.productsService.create(productData);
    return {
      data: product,
      meta: {}
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DataResponse<{ deleted: boolean }>> {
    await this.productsService.delete(parseInt(id, 10));
    return {
      data: { deleted: true },
      meta: {}
    };
  }
}
