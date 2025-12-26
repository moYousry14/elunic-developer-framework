import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedSessionService } from './shared-session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private sessionService = inject(SharedSessionService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.sessionService.user();
    
    let authReq = request;
    if (user) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        authReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.sessionService.clearSession();
        }
        return throwError(() => error);
      })
    );
  }
}
