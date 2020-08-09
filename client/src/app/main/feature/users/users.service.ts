import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../shared/interfaces/user.interface';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UsersService {

  constructor(private _http: HttpClient) { }

  createUser(UserData: User) {
    return this._http.post(environment.url.user, UserData);
  }

  getUsers(groupId: number) {
    return this._http.get(environment.url.user, {params: {group_id: groupId.toString()}});
  }

  getUser(id: number) {
    return this._http.get(`${environment.url.user}/${id}`);
  }
}
