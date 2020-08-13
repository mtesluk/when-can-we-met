import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, exhaustMap, switchMap } from 'rxjs/operators';
import * as MeetingAction from '../actions/meeting.action';
import { MeetingService } from '../../calendar/meeting.service';
import { Meeting } from '../../../shared/interfaces/meeting.interface';

@Injectable()
export class MeetingEffects {
  meetings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MeetingAction.getMeetings),
      mergeMap(action => this.meetingService.getMeetings(action.groupId, action.userId)),
      map((meetings: Meeting[]) => {
          return MeetingAction.setMeetings({meetings});
      }),
    )
  );

  constructor(
    private actions$: Actions,
    private meetingService: MeetingService,
  ) {}
}