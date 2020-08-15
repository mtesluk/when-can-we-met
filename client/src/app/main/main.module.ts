import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MainComponent } from './main.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FeatureComponent } from './feature/feature.component';
import { AddGroupComponent } from './feature/groups/add-group/add-group.component';
import { AddUserComponent } from './feature/users/add-user/add-user.component';
import { GroupListComponent } from './feature/groups/groups-list/group-list.component';
import { UsersListComponent } from './feature/users/users-list/users-list.component';
import { UsersComponent } from './feature/users/users.component';
import { GroupsComponent } from './feature/groups/groups.component';

import { calendarReducer } from './store/reducers/calendar.reducer';
import { GroupEffects } from './store/effects/group.effect';
import { UserEffects } from './store/effects/user.effects';
import { MeetingEffects } from './store/effects/meeting.effect';
import { AddingMeetingDialog } from './calendar/adding-meeting-dialog';


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
    AddingMeetingDialog,
  ],
  entryComponents: [
    AddingMeetingDialog,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('calendar', calendarReducer),
    EffectsModule.forFeature([GroupEffects, UserEffects, MeetingEffects]),
  ],
  exports: [
    MainComponent,
  ],
})
export class MainModule { }
