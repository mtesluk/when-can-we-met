import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarReducer } from '../../../store/interfaces';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/interfaces/user.interface';
import * as UserAction from '../../../store/actions/user.actions';
import * as MeetingAction from '../../../store/actions/meeting.action';
import { Group } from '../../../../shared/interfaces/group.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users$: Observable<User[]> = this._store.select(state => state.calendar.users);
  groupId: number;
  selectedUserId: number;

  constructor(private _store: Store<{calendar: CalendarReducer}>) { }

  ngOnInit(): void {
    this._store.select(state => state.calendar.group).subscribe((group: Group) => {
      if (group && group.id) {
        this.groupId = group.id;
        this._store.dispatch(UserAction.getUsers({groupId: this.groupId}));
      }
    });
  }

  onSelectUser(user: User) {
    if (this.selectedUserId !== user.id) {
      this.selectedUserId = user.id;
      this._store.dispatch(UserAction.setUser({user}));
      if (this.groupId) {
        this._store.dispatch(MeetingAction.getMeetings({groupId: this.groupId, userId: user.id}));
      }
    } else {
      this.selectedUserId = null;
      this._store.dispatch(MeetingAction.getMeetings({groupId: this.groupId}));
    }
  }

}
