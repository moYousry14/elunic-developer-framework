import { Injectable } from '@nestjs/common';
import { ProductionOrder } from '@elunic-workspace/api-interfaces';

/**
 * ProductionService handles business logic for production orders.
 * Currently returns mock data for demonstration purposes.
 */
@Injectable()
export class ProductionService {
  /**
   * Retrieves all production orders.
   * In a real implementation, this would query the database.
   * @returns Array of ProductionOrder objects
   */
  getOrders(): ProductionOrder[] {
    const mockOrders: ProductionOrder[] = [
      {
        id: 'PO-001',
        name: 'Assembly Line A - Widget Production',
        status: 'Running',
        progress: 75
      },
      {
        id: 'PO-002',
        name: 'CNC Machine B - Metal Parts',
        status: 'Running',
        progress: 42
      },
      {
        id: 'PO-003',
        name: 'Paint Station C - Surface Coating',
        status: 'Idle',
        progress: 100
      },
      {
        id: 'PO-004',
        name: 'Quality Check D - Inspection',
        status: 'Running',
        progress: 28
      },
      {
        id: 'PO-005',
        name: 'Packaging Line E - Final Assembly',
        status: 'Error',
        progress: 63
      }
    ];

    return mockOrders;
  }
}
