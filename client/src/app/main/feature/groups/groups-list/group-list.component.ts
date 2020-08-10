import { Component, OnInit } from '@angular/core';
import { CalendarReducer } from '../../../store/interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Group } from '../../../../shared/interfaces/group.interface';
import * as GroupAction from '../../../store/actions/group.action';


@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groups$: Observable<Group[]> = this._store.select(state => state.calendar.groups);
  group$: Observable<Group> = this._store.select(state => state.calendar.group);

  constructor(private _store: Store<{calendar: CalendarReducer}>) { }

  ngOnInit(): void {
    this._store.dispatch(GroupAction.getGroups());
  }

  onSelectGroup(group: Group) {
    this._store.dispatch(GroupAction.setGroup({group}));
  }

}
