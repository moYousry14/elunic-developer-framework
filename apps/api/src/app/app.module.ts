import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db.oyyosqfzvzojjndvwyql.supabase.co',
      port: 5432,
      username: 'postgres.oyyosqfzvzojjndvwyql',
      password: 'ElunicPass2025',
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