import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule],
  template: `
    <div class="dashboard-container">
      <h1 class="dashboard-title">Dashboard</h1>
      
      <div class="dashboard-grid">
        <p-card styleClass="widget-card">
          <ng-template pTemplate="header">
            <div class="widget-header">
              <i class="pi pi-shopping-cart widget-icon orders"></i>
            </div>
          </ng-template>
          <div class="widget-content">
            <span class="widget-value">1,234</span>
            <span class="widget-label">Total Orders</span>
          </div>
        </p-card>

        <p-card styleClass="widget-card">
          <ng-template pTemplate="header">
            <div class="widget-header">
              <i class="pi pi-users widget-icon users"></i>
            </div>
          </ng-template>
          <div class="widget-content">
            <span class="widget-value">56</span>
            <span class="widget-label">Active Users</span>
          </div>
        </p-card>

        <p-card styleClass="widget-card">
          <ng-template pTemplate="header">
            <div class="widget-header">
              <i class="pi pi-box widget-icon inventory"></i>
            </div>
          </ng-template>
          <div class="widget-content">
            <span class="widget-value">8,742</span>
            <span class="widget-label">Inventory Items</span>
          </div>
        </p-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 1rem;
    }

    .dashboard-title {
      font-size: 1.75rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1.5rem;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    :host ::ng-deep .widget-card {
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    :host ::ng-deep .widget-card .p-card-body {
      padding: 1.5rem;
    }

    :host ::ng-deep .widget-card .p-card-content {
      padding: 0;
    }

    .widget-header {
      display: flex;
      justify-content: center;
      padding: 1.5rem 0 0.5rem 0;
    }

    .widget-icon {
      font-size: 2.5rem;
      padding: 1rem;
      border-radius: 50%;
    }

    .widget-icon.orders {
      background: #e0f2fe;
      color: #0284c7;
    }

    .widget-icon.users {
      background: #dcfce7;
      color: #16a34a;
    }

    .widget-icon.inventory {
      background: #fef3c7;
      color: #d97706;
    }

    .widget-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .widget-value {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
    }

    .widget-label {
      font-size: 0.875rem;
      color: #6b7280;
      margin-top: 0.25rem;
    }
  `]
})
export class DashboardComponent {}
