import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CalendarReducer } from '../../../store/interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Group } from '../../../../shared/interfaces/group.interface';
import * as GroupAction from '../../../store/actions/group.action';
import * as MeetingAction from '../../../store/actions/meeting.action';


@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  @Output() changeTabToUsers = new EventEmitter<null>();

  groups$: Observable<Group[]> = this._store.select(state => state.calendar.groups);
  selectedGroupId: number;

  constructor(private _store: Store<{calendar: CalendarReducer}>) { }

  ngOnInit(): void {
    this._store.dispatch(GroupAction.getGroups());
  }

  onSelectGroup(group: Group) {
    this.selectedGroupId = group.id;
    this._store.dispatch(GroupAction.setGroup({group}));
    this._store.dispatch(MeetingAction.getMeetings({groupId: group.id}));
    this.changeTabToUsers.next();
  }

}
