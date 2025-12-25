import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-eu-central-1.pooler.supabase.com',
      port: 5432,
      username: 'postgres.oyyosqfzvzojjndvwyql',
      password: process.env['SUPABASE_PASSWORD'],
      database: 'postgres',
      entities: [User],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
      logging: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}