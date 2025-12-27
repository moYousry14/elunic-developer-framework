// System Health metrics interface
export interface SystemHealthMetrics {
  cpu: {
    usage: number;
    cores: number;
    model: string;
  };
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  uptime: number;
  timestamp: string;
  status: 'healthy' | 'warning' | 'critical';
}
