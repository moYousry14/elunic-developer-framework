import { Controller, Post, Body } from '@nestjs/common';

@Controller()
export class AppController {

  @Post('login') 
  login(@Body() body: any) {
    console.log('Received login request:', body);

    // Mock response for testing
    return {
      message: 'Login Successful! ✅',
      user: body.email,
      token: 'fake-jwt-token-for-testing'
    };
  }
}