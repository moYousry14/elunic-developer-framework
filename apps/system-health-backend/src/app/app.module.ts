import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HealthController } from './health/health.controller';
import { HealthService } from './health/health.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'dist/apps/system-health-frontend'),
    }),
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class AppModule {}
