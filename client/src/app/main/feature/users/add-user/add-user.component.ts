import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarReducer } from '../../../store/interfaces';
import { User } from '../../../../shared/interfaces/user.interface';
import { UsersService } from '../users.service';
import * as UserAction from '../../../store/actions/user.actions';
import { Group } from '../../../../shared/interfaces/group.interface';
import { FormControl } from '@angular/forms';
import { NotificationService } from '../../../../shared/directives/notification.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  selectionUsers = [];
  selectedGroup: Group = null;
  selectedUser = new FormControl();

  constructor(private _store: Store<{calendar: CalendarReducer}>,
              private _service: UsersService,
              private notificationService: NotificationService,
            ) { }

  ngOnInit(): void {
    this._service.getUsers().subscribe((users: User[]) => {
      this.selectionUsers = users;
    });

    this._store.select(store => store.calendar.group).subscribe(group => {
      if (group) {
        this.selectedGroup = group
      }
    })
  }

  onSelect(user: User) {
    if (this.selectedGroup && this.selectedGroup.id) {
      this._service.addUsersToGroup(this.selectedGroup.id, [user.username]).subscribe(() => {
        this._store.dispatch(UserAction.getUsers({groupId: this.selectedGroup.id}));
        this.selectedUser.setValue(null);
        this.notificationService.notify$.next('Group added');
      })
    }
  }

}
