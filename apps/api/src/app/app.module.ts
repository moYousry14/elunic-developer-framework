import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user.entity'; // This entity maps to the DB table

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Stable Supabase connection string
      url: 'postgresql://postgres.oyyosqfzvzojjndvwyql:ElunicPass2025@aws-0-eu-central-1.pooler.supabase.com:6543/postgres',
      entities: [User],
      synchronize: true, // Auto-creates table if it doesn't exist
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}