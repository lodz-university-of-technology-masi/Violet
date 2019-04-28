import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MessageService} from './message.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private messageService: MessageService, private router: Router) { }

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
        if (error.error.error === 'invalid_token') {
            localStorage.removeItem('oauth_token');
            this.router.navigate(['/login-user']);
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
