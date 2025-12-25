import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthResponse, LoginPayload } from '@elunic-workspace/shared-types';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Login Logic from Database
  async validateUser(loginData: LoginPayload): Promise<AuthResponse> {
    const user = await this.userRepository.findOne({ 
      where: { username: loginData.username } 
    });

    if (user) {
      return {
        success: true,
        message: 'Login Successful from Real Database! ✅',
        user: {
          id: user.id.toString(),
          username: user.username,
          email: `${user.username}@elunic.com`,
          role: user.role as any,
        },
        accessToken: 'real-db-jwt-token'
      };
    }

    return {
      success: false,
      message: 'User not found in Real Database! ❌'
    };
  }

  // Fetch all users for the Dashboard later
  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}