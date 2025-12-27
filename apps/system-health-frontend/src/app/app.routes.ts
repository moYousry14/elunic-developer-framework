import { Route } from '@angular/router';
import { HealthDashboardComponent } from './pages/health/health-dashboard.component';

export const appRoutes: Route[] = [
  { path: '', component: HealthDashboardComponent },
  { path: '**', redirectTo: '' },
];
