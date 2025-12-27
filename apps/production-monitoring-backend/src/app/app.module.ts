import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Product } from './entities/product.entity';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductionController } from './production/production.controller';
import { ProductionService } from './production/production.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'dist/apps/production-monitoring-frontend'), 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: 5432,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      entities: [User, Product],
      synchronize: true,
      ssl: false,
    }),
    TypeOrmModule.forFeature([User, Product]),
  ],
  controllers: [AppController, ProductsController, ProductionController],
  providers: [AppService, ProductsService, ProductionService],
})
export class AppModule {}