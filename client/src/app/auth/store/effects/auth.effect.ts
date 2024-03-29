import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, exhaustMap, mergeMap, tap, switchMap } from 'rxjs/operators';
import * as AuthAction from '../actions/auth.action';
import { AuthService } from '../../auth.service';
import { NotificationService } from '../../../shared/directives/notification.service';


@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.login),
      exhaustMap(action => this.authService.login(action.credentials)),
      map((response: {token: string}) => {
        if (response?.token) {
          localStorage.setItem('token', response.token);
          this.notificationService.notify$.next('Sign in succesfull');
          return AuthAction.setToken(response);
        } else {
          this.notificationService.notify$.next('Sign in failed');
          return AuthAction.setToken(null);
        }
      }),
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.logout),
      map(() => {
        localStorage.removeItem('token');
        this.notificationService.notify$.next('Logout succesfully');
        return AuthAction.setToken({token: ''});
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {}
}