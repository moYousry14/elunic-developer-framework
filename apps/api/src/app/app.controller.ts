import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthResponse, LoginPayload } from '@elunic-workspace/shared-types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus() {
    return {
      status: 'ok',
      message: 'Elunic ERP API is running',
      version: '1.0.0',
      endpoints: {
        login: 'POST /api/login'
      }
    };
  }

  @Post('login')
  async login(@Body() loginData: LoginPayload): Promise<AuthResponse> {
    return await this.appService.validateUser(loginData);
  }
}