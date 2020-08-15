import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';


@Injectable()
export class CalendarService {

  constructor() { }

  getColors() {

  }

  isTimeGraterThanTime(time: string, thanTime: string) {
    const [hourFirst, minuteFirst] = time.split(':').map(part => Number(part));
    const [hourSecond, minuteSecond] = thanTime.split(':').map(part => Number(part));
    return hourFirst > hourSecond || (hourFirst === hourSecond && minuteFirst >= minuteSecond);
  }

  getNumberFromTime(time: string) {
    const splittedTime = time.split(':').map(part => Number(part));
    const hour = splittedTime[0];
    const minute = splittedTime[1];
    return minute === 0 ? hour : hour + 0.5;
  }

  generateTimes(from: string = '0:00', to: string = '23:30') {
    const hours = Array.from({ length: 48 }, (_, hour) => moment({
        hour: Math.floor(hour / 2),
        minutes: (hour % 2 === 0 ? 0 : 30)
      }).format('HH:mm')
    );
    return hours.slice(this.getNumberFromTime(from) * 2, this.getNumberFromTime(to) * 2 + 1);
  }
}
