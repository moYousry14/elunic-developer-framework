import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { KnobModule } from 'primeng/knob';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';

import { DataResponse, ProductionOrder } from '@elunic-workspace/api-interfaces';

/**
 * DashboardComponent displays production orders overview with efficiency metrics.
 * Uses Angular Signals for reactive state management and inject() pattern for DI.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    KnobModule,
    ProgressBarModule,
    TagModule
  ],
  template: `
    <!-- Dashboard container with sioDefault background -->
    <div class="tw-p-6 tw-min-h-full" style="background-color: #ececec;">
      
      <!-- Page title with Oxygen font -->
      <h1 class="tw-text-2xl tw-font-semibold tw-text-gray-800 tw-mb-6" 
          style="font-family: 'Oxygen', sans-serif;">
        Production Dashboard
      </h1>
      
      <!-- Top metrics row: Overall Efficiency Knob -->
      <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6 tw-mb-6">
        
        <!-- Overall Efficiency Card with PrimeNG Knob -->
        <p-card styleClass="tw-shadow-md tw-rounded-lg">
          <div class="tw-flex tw-flex-col tw-items-center tw-py-4">
            <h3 class="tw-text-lg tw-font-medium tw-text-gray-700 tw-mb-4"
                style="font-family: 'Oxygen', sans-serif;">
              Overall Efficiency
            </h3>
            <!-- Knob displays computed average efficiency -->
            <p-knob 
              [(ngModel)]="overallEfficiency"
              [readonly]="true"
              [size]="150"
              [strokeWidth]="8"
              valueColor="#0090D4"
              rangeColor="#e0e0e0"
              valueTemplate="{value}%">
            </p-knob>
          </div>
        </p-card>

        <!-- Running Orders Count -->
        <p-card styleClass="tw-shadow-md tw-rounded-lg">
          <div class="tw-flex tw-flex-col tw-items-center tw-py-4">
            <i class="pi pi-play-circle tw-text-4xl tw-mb-3" style="color: #0090D4;"></i>
            <span class="tw-text-3xl tw-font-bold tw-text-gray-800">{{ runningCount() }}</span>
            <span class="tw-text-sm tw-text-gray-500 tw-mt-1"
                  style="font-family: 'Oxygen', sans-serif;">
              Running Orders
            </span>
          </div>
        </p-card>

        <!-- Error Orders Count -->
        <p-card styleClass="tw-shadow-md tw-rounded-lg">
          <div class="tw-flex tw-flex-col tw-items-center tw-py-4">
            <i class="pi pi-exclamation-triangle tw-text-4xl tw-mb-3 tw-text-red-500"></i>
            <span class="tw-text-3xl tw-font-bold tw-text-gray-800">{{ errorCount() }}</span>
            <span class="tw-text-sm tw-text-gray-500 tw-mt-1"
                  style="font-family: 'Oxygen', sans-serif;">
              Orders with Errors
            </span>
          </div>
        </p-card>
      </div>

      <!-- Production Orders List with Progress Bars -->
      <p-card styleClass="tw-shadow-md tw-rounded-lg">
        <ng-template pTemplate="header">
          <div class="tw-px-4 tw-py-3 tw-border-b tw-border-gray-200">
            <h3 class="tw-text-lg tw-font-medium tw-text-gray-700"
                style="font-family: 'Oxygen', sans-serif;">
              Production Orders
            </h3>
          </div>
        </ng-template>
        
        <div class="tw-space-y-4">
          @for (order of orders(); track order.id) {
            <div class="tw-p-4 tw-bg-gray-50 tw-rounded-lg tw-border tw-border-gray-200">
              
              <!-- Order header with name and status -->
              <div class="tw-flex tw-justify-between tw-items-center tw-mb-3">
                <div>
                  <span class="tw-font-medium tw-text-gray-800"
                        style="font-family: 'Oxygen', sans-serif;">
                    {{ order.name }}
                  </span>
                  <span class="tw-text-sm tw-text-gray-500 tw-ml-2">
                    ({{ order.id }})
                  </span>
                </div>
                
                <!-- Status badge using PrimeNG Tag -->
                <p-tag 
                  [value]="order.status" 
                  [severity]="getStatusSeverity(order.status)">
                </p-tag>
              </div>
              
              <!-- Progress bar with sioDefault primary color -->
              <div class="tw-flex tw-items-center tw-gap-3">
                <p-progressBar 
                  [value]="order.progress" 
                  [showValue]="false"
                  styleClass="tw-flex-1 tw-h-3"
                  [style]="{ height: '12px' }">
                </p-progressBar>
                <span class="tw-text-sm tw-font-medium tw-text-gray-600 tw-w-12 tw-text-right">
                  {{ order.progress }}%
                </span>
              </div>
            </div>
          } @empty {
            <!-- Loading state when orders are being fetched -->
            <div class="tw-text-center tw-py-8 tw-text-gray-500">
              <i class="pi pi-spin pi-spinner tw-text-2xl tw-mb-2"></i>
              <p>Loading production orders...</p>
            </div>
          }
        </div>
      </p-card>
    </div>
  `,
  styles: [`
    /* Custom styles for PrimeNG components to use sioDefault palette */
    :host ::ng-deep .p-progressbar {
      background-color: #e0e0e0;
      border-radius: 6px;
    }
    
    :host ::ng-deep .p-progressbar-value {
      background-color: #0090D4;
      border-radius: 6px;
    }
    
    :host ::ng-deep .p-card {
      background-color: white;
    }
    
    :host ::ng-deep .p-card-body {
      padding: 1rem;
    }
  `]
})
export class DashboardComponent implements OnInit {
  /** HttpClient injected using the inject() pattern */
  private http = inject(HttpClient);

  /** Signal holding the production orders array */
  orders = signal<ProductionOrder[]>([]);

  /** Overall efficiency value for the knob (computed from orders) */
  overallEfficiency = 0;

  /** Computed signal: count of orders with 'Running' status */
  runningCount = computed(() => 
    this.orders().filter(o => o.status === 'Running').length
  );

  /** Computed signal: count of orders with 'Error' status */
  errorCount = computed(() => 
    this.orders().filter(o => o.status === 'Error').length
  );

  ngOnInit(): void {
    this.fetchOrders();
  }

  /**
   * Fetches production orders from the API.
   * Uses the DataResponse wrapper for consistent response handling.
   */
  private fetchOrders(): void {
    this.http.get<DataResponse<ProductionOrder[]>>('/api/production/orders')
      .subscribe({
        next: (response) => {
          this.orders.set(response.data);
          
          // Calculate overall efficiency as average progress
          if (response.data.length > 0) {
            const totalProgress = response.data.reduce((sum, o) => sum + o.progress, 0);
            this.overallEfficiency = Math.round(totalProgress / response.data.length);
          }
        },
        error: (err) => {
          console.error('Failed to fetch production orders:', err);
        }
      });
  }

  /**
   * Returns PrimeNG Tag severity based on order status.
   * @param status - The production order status
   * @returns Severity string for p-tag component
   */
  getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    switch (status) {
      case 'Running':
        return 'success';
      case 'Idle':
        return 'info';
      case 'Error':
        return 'danger';
      default:
        return 'secondary';
    }
  }
}
