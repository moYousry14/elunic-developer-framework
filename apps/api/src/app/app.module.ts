import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'dist/apps/frontend'),
      exclude: ['/api/*'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env['PGHOST'],
      port: parseInt(process.env['PGPORT'] || '5432'),
      username: process.env['PGUSER'],
      password: process.env['PGPASSWORD'],
      database: process.env['PGDATABASE'],
      entities: [User],
      synchronize: true,
      ssl: false,
      logging: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}