import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, exhaustMap } from 'rxjs/operators';
import * as GroupAction from '../actions/group.action';
import { GroupsService } from '../../feature/groups/groups.service';
import { Group } from '../../../shared/interfaces/group.interface';
import { NotificationService } from '../../../shared/directives/notification.service';


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

  // group$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(GroupAction.setGroup),
  //     // mergeMap(() => this.groupsService.getGroups()),
  //     map(action => {
  //         return GroupAction.setGroup({group: action.group});
  //     }),
  //   )
  // );

  createGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupAction.createGroup),
      exhaustMap(action => this.groupsService.createGroup(action.group)),
      map(response => {
        this.notificationService.notify$.next('Group added');
        return GroupAction.getGroups();
      }),
    )
  );

  constructor(
    private actions$: Actions,
    private groupsService: GroupsService,
    private notificationService: NotificationService,
  ) {}
}