import { Injectable } from '@nestjs/common';
import * as os from 'os';
import { DataResponse } from '@elunic-workspace/api-interfaces';
import { SystemHealthMetrics } from '@elunic-workspace/api-interfaces';

@Injectable()
export class HealthService {
  getHealthMetrics(): DataResponse<SystemHealthMetrics> {
    const cpus = os.cpus();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const memPercentage = Math.round((usedMem / totalMem) * 100);

    // Calculate CPU usage from idle time
    const cpuUsage = this.calculateCpuUsage(cpus);

    // Determine overall status
    let status: 'healthy' | 'warning' | 'critical' = 'healthy';
    if (cpuUsage > 90 || memPercentage > 90) {
      status = 'critical';
    } else if (cpuUsage > 70 || memPercentage > 70) {
      status = 'warning';
    }

    const metrics: SystemHealthMetrics = {
      cpu: {
        usage: cpuUsage,
        cores: cpus.length,
        model: cpus[0]?.model || 'Unknown',
      },
      memory: {
        used: Math.round(usedMem / 1024 / 1024),
        total: Math.round(totalMem / 1024 / 1024),
        percentage: memPercentage,
      },
      uptime: Math.round(os.uptime()),
      timestamp: new Date().toISOString(),
      status,
    };

    return {
      data: metrics,
      meta: {
        version: '1.0.0',
        hostname: os.hostname(),
      },
    };
  }

  private calculateCpuUsage(cpus: os.CpuInfo[]): number {
    let totalIdle = 0;
    let totalTick = 0;

    for (const cpu of cpus) {
      for (const type in cpu.times) {
        totalTick += cpu.times[type as keyof typeof cpu.times];
      }
      totalIdle += cpu.times.idle;
    }

    const idle = totalIdle / cpus.length;
    const total = totalTick / cpus.length;
    const usage = 100 - Math.round((idle / total) * 100);

    return usage;
  }
}
