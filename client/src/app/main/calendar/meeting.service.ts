import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class MeetingService {

  constructor(private _http: HttpClient) { }

  getMeetings(groupId: number, userId?: number) {
    const params = {
      group_id: groupId.toString(),
    };
    if (userId) {
      params['user_id'] = userId.toString();
    }
    return this._http.get(environment.url.meeting, {params: params});
  }
}
