import { Injectable } from '@nestjs/common';
import { AuthResponse, LoginPayload } from '@elunic-workspace/shared-types';

@Injectable()
export class AppService {
  async validateUser(loginData: LoginPayload): Promise<AuthResponse> {
    // Reverting to Mock Data for stability
    if (loginData.username === 'admin' && loginData.password === 'password123') {
      return {
        success: true,
        message: 'Login Successful (Mock Data) ✅',
        user: {
          id: '1',
          username: 'admin',
          email: 'admin@elunic.com',
          role: 'admin',
        },
        accessToken: 'mock-jwt-token'
      };
    }

    return {
      success: false,
      message: 'Invalid credentials ❌'
    };
  }
}