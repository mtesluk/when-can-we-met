import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { MainComponent } from './main.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FeatureComponent } from './feature/feature.component';
import { AddGroupComponent } from './feature/groups/add-group/add-group.component';
import { AddUserComponent } from './feature/users/add-user/add-user.component';
import { GroupListComponent } from './feature/groups/groups-list/group-list.component';
import { UsersListComponent } from './feature/users/users-list/users-list.component';
import { UsersComponent } from './feature/users/users.component';
import { GroupsComponent } from './feature/groups/groups.component';


@NgModule({
  declarations: [
    MainComponent,
    FeatureComponent,
    CalendarComponent,
    AddUserComponent,
    AddGroupComponent,
    GroupListComponent,
    UsersListComponent,
    UsersComponent,
    GroupsComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    MainComponent
  ],
})
export class MainModule { }
