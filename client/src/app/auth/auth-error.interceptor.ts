import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthReducer } from './store/interfaces';
import * as AuthActions from './store/actions/auth.action';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {

  constructor(private _store: Store<{auth: AuthReducer}>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        if(err instanceof HttpErrorResponse && err.status == 401) {
            this._store.dispatch(AuthActions.logout());
        }
        return throwError(err);
      }));
  }
}
