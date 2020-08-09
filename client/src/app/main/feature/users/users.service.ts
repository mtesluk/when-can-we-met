import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../shared/interfaces/user.interface';

@Injectable()
export class UsersService {

  constructor(private _http: HttpClient) { }

  createUser(UserData: User) {
    return this._http.post('/users', UserData);
  }

  getUsers(groupId: number) {
    return this._http.get('/users', {params: {group_id: groupId.toString()}});
  }

  getUser(id: number) {
    return this._http.get(`/users/${id}`);
  }
}
