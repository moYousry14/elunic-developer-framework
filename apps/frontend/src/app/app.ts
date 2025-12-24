import { Component, inject } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message'; 

// Import shared types for end-to-end type safety
import { AuthResponse, LoginPayload } from '@elunic-workspace/shared-types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ButtonModule, 
    InputTextModule, PasswordModule, CardModule, 
    FloatLabelModule, MessageModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  private http = inject(HttpClient); 

  title = 'Elunic ERP POC';

  // Using properties that match our shared LoginPayload
  username = '';
  password = '';

  // Typed response instead of 'any'
  loginResult: AuthResponse | null = null; 

  login() {
    console.log('Initiating secure login via Proxy...');

    const payload: LoginPayload = {
      username: this.username,
      password: this.password
    };

    // Post request with explicit generic type
    this.http.post<AuthResponse>('/api/login', payload)
      .subscribe({
        next: (response) => {
          console.log('Server Response:', response);
          this.loginResult = response;

          // Example of accessing typed data
          if (response.success) {
            console.log(`Welcome back, ${response.user?.username}! Role: ${response.user?.role}`);
          }
        },
        error: (err) => {
          console.error('Authentication Error:', err);
          this.loginResult = {
            success: false,
            message: 'Connection failed. Please check if the API is running.'
          };
        }
      });
  }
}