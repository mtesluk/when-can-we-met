import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../../../shared/interfaces/group.interface';
import { Store } from '@ngrx/store';
import { CalendarReducer } from '../../store/interfaces';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  group$: Observable<Group> = this._store.select(state => state.calendar.group);

  constructor(private _store: Store<{calendar: CalendarReducer}>) { }

  ngOnInit(): void {
  }

}
