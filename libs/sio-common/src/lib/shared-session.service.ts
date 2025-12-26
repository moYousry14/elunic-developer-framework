import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserMeDto } from '@elunic-workspace/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class SharedSessionService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private _user = signal<UserMeDto | null>(null);
  private _isInitialized = signal(false);
  private _isLoading = signal(false);

  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);
  readonly isInitialized = this._isInitialized.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  readonly userDisplayName = computed(() => {
    const u = this._user();
    return u?.displayName || u?.username || 'Guest';
  });

  readonly userInitials = computed(() => {
    const name = this.userDisplayName();
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  });

  initializeService(): Promise<void> {
    return new Promise((resolve) => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser) as UserMeDto;
          this._user.set(userData);
        } catch {
          localStorage.removeItem('user');
        }
      }
      this._isInitialized.set(true);
      resolve();
    });
  }

  setUser(user: UserMeDto): void {
    this._user.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearSession(): void {
    this._user.set(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.clearSession();
  }
}
