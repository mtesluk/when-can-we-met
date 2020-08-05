import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from '../../../shared/interfaces/group.interface';


@Injectable()
export class GroupsService {

  constructor(private _http: HttpClient) { }

  createGroup(groupData: Group) {
    return this._http.post('/groups', groupData);
  }
}
