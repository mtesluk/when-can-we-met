import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthService } from './auth/auth.service';
import { GroupsService } from './main/feature/groups/groups.service';
import { UsersService } from './main/feature/users/users.service';


@NgModule({
  providers: [
    GroupsService,
    AuthService,
    UsersService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ]
})
export class CoreModule { }
