import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthResponse, LoginPayload } from '@elunic-workspace/shared-types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  async login(@Body() loginData: LoginPayload): Promise<AuthResponse> {
    return await this.appService.validateUser(loginData);
  }
}