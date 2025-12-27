import { Controller, Get } from '@nestjs/common';
import { DataResponse } from '@elunic-workspace/api-interfaces';
import { SystemHealthMetrics } from '@elunic-workspace/api-interfaces';
import { HealthService } from './health.service';

@Controller('api/system')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('health')
  getHealth(): DataResponse<SystemHealthMetrics> {
    return this.healthService.getHealthMetrics();
  }
}
