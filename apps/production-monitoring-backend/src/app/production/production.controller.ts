import { Controller, Get } from '@nestjs/common';
import { ProductionService } from './production.service';
import { DataResponse, ProductionOrder } from '@elunic-workspace/api-interfaces';

/**
 * ProductionController handles HTTP requests for production-related endpoints.
 * All responses are wrapped in the standard DataResponse format.
 */
@Controller('production')
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  /**
   * GET /api/production/orders
   * Returns all production orders wrapped in DataResponse format.
   */
  @Get('orders')
  getOrders(): DataResponse<ProductionOrder[]> {
    const orders = this.productionService.getOrders();
    
    return {
      data: orders,
      meta: {
        total: orders.length,
        timestamp: new Date().toISOString()
      }
    };
  }
}
