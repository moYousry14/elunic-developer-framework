import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { KnobModule } from 'primeng/knob';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { HeaderComponent, HeaderConfig } from '@elunic-workspace/sio-common';
import { DataResponse, SystemHealthMetrics } from '@elunic-workspace/api-interfaces';

@Component({
  selector: 'app-health-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    KnobModule,
    ProgressBarModule,
    CardModule,
    TagModule,
    HeaderComponent,
  ],
  template: `
    <div class="tw-min-h-screen tw-bg-gray-100">
      <sio-header [config]="headerConfig"></sio-header>
      
      <div class="tw-p-6">
        <div class="tw-mb-6">
          <h1 class="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-2">System Health Monitor</h1>
          <p class="tw-text-gray-600">Real-time CPU and Memory metrics</p>
        </div>

        @if (loading()) {
          <div class="tw-flex tw-justify-center tw-items-center tw-h-64">
            <i class="pi pi-spin pi-spinner tw-text-4xl" style="color: #0090D4;"></i>
          </div>
        } @else if (error()) {
          <div class="tw-bg-red-100 tw-border tw-border-red-400 tw-text-red-700 tw-px-4 tw-py-3 tw-rounded">
            {{ error() }}
          </div>
        } @else if (metrics()) {
          <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
            <!-- Status Card -->
            <p-card styleClass="tw-shadow-lg">
              <ng-template pTemplate="header">
                <div class="tw-p-4 tw-flex tw-items-center tw-justify-between" style="background: #0090D4;">
                  <span class="tw-text-white tw-font-bold">System Status</span>
                  <p-tag [value]="metrics()!.status | uppercase" [severity]="getStatusSeverity(metrics()!.status)"></p-tag>
                </div>
              </ng-template>
              <div class="tw-text-center tw-py-4">
                <i class="pi pi-server tw-text-5xl tw-mb-4" [style.color]="getStatusColor(metrics()!.status)"></i>
                <p class="tw-text-gray-600 tw-mb-2">Uptime</p>
                <p class="tw-text-2xl tw-font-bold" style="color: #0090D4;">{{ formatUptime(metrics()!.uptime) }}</p>
              </div>
            </p-card>

            <!-- CPU Card -->
            <p-card styleClass="tw-shadow-lg">
              <ng-template pTemplate="header">
                <div class="tw-p-4" style="background: #0090D4;">
                  <span class="tw-text-white tw-font-bold">CPU Usage</span>
                </div>
              </ng-template>
              <div class="tw-flex tw-flex-col tw-items-center tw-py-4">
                <p-knob 
                  [(ngModel)]="cpuValue" 
                  [readonly]="true" 
                  [size]="150"
                  valueColor="#0090D4"
                  rangeColor="#e0e0e0">
                </p-knob>
                <div class="tw-mt-4 tw-text-center">
                  <p class="tw-text-gray-600">{{ metrics()!.cpu.cores }} Cores</p>
                  <p class="tw-text-sm tw-text-gray-500 tw-truncate tw-max-w-xs">{{ metrics()!.cpu.model }}</p>
                </div>
              </div>
            </p-card>

            <!-- Memory Card -->
            <p-card styleClass="tw-shadow-lg">
              <ng-template pTemplate="header">
                <div class="tw-p-4" style="background: #0090D4;">
                  <span class="tw-text-white tw-font-bold">Memory Usage</span>
                </div>
              </ng-template>
              <div class="tw-flex tw-flex-col tw-items-center tw-py-4">
                <p-knob 
                  [(ngModel)]="memoryValue" 
                  [readonly]="true" 
                  [size]="150"
                  valueColor="#0090D4"
                  rangeColor="#e0e0e0">
                </p-knob>
                <div class="tw-mt-4 tw-text-center">
                  <p class="tw-text-gray-600">
                    {{ metrics()!.memory.used }} MB / {{ metrics()!.memory.total }} MB
                  </p>
                </div>
              </div>
            </p-card>
          </div>

          <!-- Memory Progress Bar -->
          <div class="tw-mt-6">
            <p-card styleClass="tw-shadow-lg">
              <ng-template pTemplate="header">
                <div class="tw-p-4" style="background: #0090D4;">
                  <span class="tw-text-white tw-font-bold">Memory Allocation</span>
                </div>
              </ng-template>
              <div class="tw-p-4">
                <div class="tw-flex tw-justify-between tw-mb-2">
                  <span class="tw-text-gray-700">Used Memory</span>
                  <span class="tw-font-bold" style="color: #0090D4;">{{ metrics()!.memory.percentage }}%</span>
                </div>
                <p-progressBar [value]="metrics()!.memory.percentage" [showValue]="false"></p-progressBar>
                <div class="tw-flex tw-justify-between tw-mt-2 tw-text-sm tw-text-gray-500">
                  <span>{{ metrics()!.memory.used }} MB used</span>
                  <span>{{ metrics()!.memory.total - metrics()!.memory.used }} MB free</span>
                </div>
              </div>
            </p-card>
          </div>

          <!-- Last Updated -->
          <div class="tw-mt-4 tw-text-center tw-text-gray-500 tw-text-sm">
            Last updated: {{ metrics()!.timestamp | date:'medium' }}
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HealthDashboardComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private refreshInterval: ReturnType<typeof setInterval> | null = null;

  headerConfig: HeaderConfig = {
    title: 'System Health',
    showStatus: true,
    appSwitcher: true,
  };

  metrics = signal<SystemHealthMetrics | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  cpuValue = 0;
  memoryValue = 0;

  ngOnInit(): void {
    this.fetchMetrics();
    this.refreshInterval = setInterval(() => this.fetchMetrics(), 5000);
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  fetchMetrics(): void {
    this.http.get<DataResponse<SystemHealthMetrics>>('/api/system/health').subscribe({
      next: (response) => {
        this.metrics.set(response.data);
        this.cpuValue = response.data.cpu.usage;
        this.memoryValue = response.data.memory.percentage;
        this.loading.set(false);
        this.error.set(null);
      },
      error: (err) => {
        this.error.set('Failed to fetch system health metrics');
        this.loading.set(false);
        console.error('Health API error:', err);
      },
    });
  }

  getStatusSeverity(status: string): 'success' | 'warn' | 'danger' {
    switch (status) {
      case 'healthy':
        return 'success';
      case 'warning':
        return 'warn';
      case 'critical':
        return 'danger';
      default:
        return 'success';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'healthy':
        return '#22c55e';
      case 'warning':
        return '#f59e0b';
      case 'critical':
        return '#ef4444';
      default:
        return '#0090D4';
    }
  }

  formatUptime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    }
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }
}
