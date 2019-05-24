import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MessageService} from './message.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private messageService: MessageService, private router: Router, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') && !req.url.includes('/oauth/token')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ` + JSON.parse(localStorage.getItem('token')).access_token
        }
      });
    }

    return next.handle(req).pipe(
      catchError(error => {
        if (error.error.error === 'invalid_token' || error.error.message === 'user_not_found') {
            localStorage.removeItem('token');
            this.router.navigate(['/login-user']);
            this.authService.addEvent('logout');
        } else if (error instanceof HttpErrorResponse && error.error.error !== 'unauthorized' && error.error.error !== 'invalid_token') {
          if (error.error.message) {
            this.messageService.error(`${error.error.message}`);
          } else if (error.error.error) {
            this.messageService.error(`${error.error.error}`);
          } else if (error.name === 'HttpErrorResponse') {
              this.messageService.error(`server_error`);
          }
        }
        return throwError(error);
      }));
  }
}
