import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, exhaustMap } from 'rxjs/operators';
import * as AuthAction from '../actions/auth.action';
import { AuthService } from '../../auth.service';


@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.login),
      exhaustMap(action => this.authService.login(action.credentials)),
      map((response: {token: string}) => {
          localStorage.setItem('token', response.token);
          return AuthAction.setToken(response);
      }),
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}