import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthResponse, LoginPayload } from '@elunic-workspace/shared-types';

/**
 * AppService handles core application logic including authentication.
 * Follows Elunic Golden Stack Standards for secure password validation.
 */
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Validates user credentials against the database.
   * For admin user, strictly validates password against ADMIN_PASSWORD environment variable.
   * Empty passwords are never allowed.
   * @param loginData - The login payload containing username and password
   * @returns AuthResponse with success status and user profile if authenticated
   */
  async validateUser(loginData: LoginPayload): Promise<AuthResponse> {
    // Reject empty passwords immediately
    if (!loginData.password || loginData.password.trim() === '') {
      return {
        success: false,
        message: 'Password is required. Empty passwords are not allowed.'
      };
    }

    const user = await this.userRepository.findOne({ 
      where: { username: loginData.username } 
    });

    if (!user) {
      return {
        success: false,
        message: 'Invalid username or password.'
      };
    }

    // Validate password for admin user against ADMIN_PASSWORD environment variable
    if (user.username === 'admin') {
      const adminPassword = process.env['ADMIN_PASSWORD'];
      
      if (!adminPassword) {
        console.error('ADMIN_PASSWORD environment variable is not set!');
        return {
          success: false,
          message: 'Authentication system is not properly configured.'
        };
      }

      if (loginData.password !== adminPassword) {
        return {
          success: false,
          message: 'Invalid username or password.'
        };
      }
    } else {
      // For non-admin users, validate against stored password
      if (loginData.password !== user.password) {
        return {
          success: false,
          message: 'Invalid username or password.'
        };
      }
    }

    return {
      success: true,
      message: 'Login successful!',
      user: {
        id: user.id.toString(),
        username: user.username,
        email: `${user.username}@elunic.com`,
        role: user.role as any,
      },
      accessToken: 'jwt-token-placeholder'
    };
  }

  /**
   * Fetches all users from the database.
   * @returns Array of User entities
   */
  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}