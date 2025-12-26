import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    // The Standard Enterprise way to serve static files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'), // Fixed path for NX
      renderPath: '/', // Handle all routes except /api
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST || 'localhost',
      port: parseInt(process.env.PGPORT || '5432'),
      username: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      database: process.env.PGDATABASE || 'postgres',
      entities: [User],
      synchronize: true,
      ssl: false, 
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}