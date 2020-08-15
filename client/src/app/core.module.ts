import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthService } from './auth/auth.service';
import { GroupsService } from './main/feature/groups/groups.service';
import { UsersService } from './main/feature/users/users.service';
import { MeetingService } from './main/calendar/meeting.service';
import { AuthErrorInterceptor } from './auth/auth-error.interceptor';
import { CalendarService } from './main/calendar/calendar.service';
import { NotificationService } from './shared/directives/notification.service';


@NgModule({
  providers: [
    GroupsService,
    AuthService,
    UsersService,
    MeetingService,
    CalendarService,
    NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true },
  ]
})
export class CoreModule { }
