import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from './credentials.interface';

@Injectable()
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(credentials: Credentials) {
    return this._http.post('/login', credentials);
  }
}
