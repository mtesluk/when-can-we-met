import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, exhaustMap, switchMap } from 'rxjs/operators';
import * as UserActions from '../actions/user.actions';
import { UsersService } from '../../feature/users/users.service';
import { User } from '../../../shared/interfaces/user.interface';


@Injectable()
export class UserEffects {
  users$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUsers),
      mergeMap(action => this.userService.getUsers(action.groupId)),
      map((users: User[]) => {
          return UserActions.setUsers({users});
      }),
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UsersService,
  ) {}
}