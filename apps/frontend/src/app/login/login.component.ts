import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';

import { AuthResponse, LoginPayload } from '@elunic-workspace/shared-types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    FloatLabelModule,
    MessageModule
  ],
  template: `
    <div class="login-container" style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f4f7f9;">
      <p-card header="ERP Login" [style]="{ width: '360px' }">
        <div class="flex flex-column gap-4">
          <div class="field">
            <p-floatLabel>
              <input pInputText id="username" [(ngModel)]="username" class="w-full" />
              <label for="username">Username or Email</label>
            </p-floatLabel>
          </div>

          <div class="field" style="margin-top: 25px;">
            <p-floatLabel>
              <p-password id="password" [(ngModel)]="password" [feedback]="false" [toggleMask]="true" styleClass="w-full" inputStyleClass="w-full"></p-password>
              <label for="password">Password</label>
            </p-floatLabel>
          </div>

          <div style="margin-top: 25px;">
            <p-button label="Login" (onClick)="login()" styleClass="w-full" icon="pi pi-sign-in"></p-button>
          </div>

          <hr style="margin: 20px 0; border: 0; border-top: 1px solid #dee2e6;" />

          <div *ngIf="loginResult" class="text-center">
            <p-message *ngIf="loginResult.success" severity="success" [text]="loginResult.message" styleClass="w-full"></p-message>
            <p-message *ngIf="!loginResult.success" severity="error" [text]="loginResult.message" styleClass="w-full"></p-message>
            
            <div *ngIf="loginResult.user" style="margin-top: 10px; font-size: 0.9em; color: #666;">
              Welcome back, <strong>{{ loginResult.user.username }}</strong>! <br>
              Role: <span class="badge">{{ loginResult.user.role }}</span>
            </div>
          </div>
        </div>
      </p-card>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  username = '';
  password = '';
  loginResult: AuthResponse | null = null;

  login() {
    console.log('Initiating secure login via Proxy...');

    const payload: LoginPayload = {
      username: this.username,
      password: this.password
    };

    this.http.post<AuthResponse>('/api/login', payload)
      .subscribe({
        next: (response) => {
          console.log('Server Response:', response);
          this.loginResult = response;

          if (response.success && response.user) {
            console.log(`Welcome back, ${response.user.username}! Role: ${response.user.role}`);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.router.navigate(['/dashboard']);
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
