import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, exhaustMap } from 'rxjs/operators';
import * as GroupAction from '../actions/group.action';
import { GroupsService } from '../../feature/groups/groups.service';
import { Group } from '../../../shared/interfaces/group.interface';


@Injectable()
export class GroupEffects {
  groups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupAction.getGroups),
      mergeMap(() => this.groupsService.getGroups()),
      map((groups: Group[]) => {
          return GroupAction.setGroups({groups});
      }),
    )
  );

  createGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupAction.createGroup),
      exhaustMap(action => this.groupsService.createGroup(action.group)),
      map(response => {
          return GroupAction.getGroups();
      }),
    )
  );

  constructor(
    private actions$: Actions,
    private groupsService: GroupsService
  ) {}
}