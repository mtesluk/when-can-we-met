import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from '../../../shared/interfaces/group.interface';
import { environment } from '../../../../environments/environment';


@Injectable()
export class GroupsService {

  constructor(private _http: HttpClient) { }

  createGroup(groupData: Group) {
    return this._http.post(environment.url.group, groupData);
  }

  getGroups() {
    return this._http.get(environment.url.group);
  }

  getGroup(id: number) {
    return this._http.get(`${environment.url.group}/${id}`);
  }
}
