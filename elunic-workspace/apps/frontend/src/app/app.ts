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

  title = 'ERP System';
  email: string = '';
  password: string = '';
  loginResult: any = null; 

  login() {
    console.log('Sending to Backend via Proxy...');

    this.http.post('/api/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.loginResult = response; 
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Connection Failed! Check console for details.');
      }
    });
  }
}