import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from '../../../shared/interfaces/group.interface';


@Injectable()
export class GroupsService {

  constructor(private _http: HttpClient) { }

  createGroup(groupData: Group) {
    return this._http.post('/groups', groupData);
  }

  getGroups() {
    return this._http.get('/groups');
  }

  getGroup(id: number) {
    return this._http.get(`/groups/${id}`);
  }
}
