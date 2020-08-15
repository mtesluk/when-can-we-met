import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NotificationService {
  notify$ = new Subject<string>();

  constructor() { }
}
