import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DataSource } from 'typeorm';
import { User } from './app/user.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3000;

  // --- Seed Logic Start ---
  // Accessing the database connection directly from the app instance
  const dataSource = app.get(DataSource);
  const userRepository = dataSource.getRepository(User);

  // Check if admin already exists to avoid duplicates
  const adminExists = await userRepository.findOne({
    where: { username: 'admin' },
  });

  if (!adminExists) {
    const admin = userRepository.create({
      username: 'admin',
      password: 'password123', // Reminder: In production, always hash passwords!
      role: 'admin',
    });
    await userRepository.save(admin);
    Logger.log('✅ Default Admin user created in SQLite database');
  } else {
    Logger.log('ℹ️ Admin user already exists in database');
  }
  // --- Seed Logic End ---

  await app.listen(port, '0.0.0.0'); 
  Logger.log(`🚀 API is running on: http://0.0.0.0:${port}/${globalPrefix}`);
}

bootstrap();
