import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthResponse, LoginPayload } from '@elunic-workspace/shared-types';
import { DataResponse } from '@elunic-workspace/api-interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus(): DataResponse<{ status: string; message: string; version: string; endpoints: Record<string, string> }> {
    return {
      data: {
        status: 'ok',
        message: 'Elunic ERP API is running',
        version: '1.0.0',
        endpoints: {
          login: 'POST /api/login',
          products: 'GET /api/products'
        }
      },
      meta: {}
    };
  }

  @Post('login')
  async login(@Body() loginData: LoginPayload): Promise<AuthResponse> {
    return await this.appService.validateUser(loginData);
  }
}