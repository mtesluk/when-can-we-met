import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarReducer } from '../store/interfaces';
import { map } from 'rxjs/operators';
import { Meeting } from '../../shared/interfaces/meeting.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  HOURS = [];
  COLORS = ['#f5dcc0', '#aeed91', '#a5c4f7', '#60b553', '#f3b6b7'];
  usersColors = {};
  dates: Date[] = [];
  meetings: Meeting[] = [];
  meetingsArrang = {};
  SHOWING = 0;
  ADDING = 1;
  mode = this.SHOWING;

  constructor(private _store: Store<{calendar: CalendarReducer}>) { }

  ngOnInit(): void {
    this.getHours();
    this.getMeetings();
    this.setWeek();
  }

  getColors(time: string, day: Date) {
    if (this.mode === this.SHOWING) {
      for (let i = 0; i < this.meetings.length; i++) {
        const startDate = new Date(this.meetings[i].startDate);
        const endDate = new Date(this.meetings[i].endDate);
        const hour = Number(time.split(':')[0]);
        const minute = Number(time.split(':')[1]);
        day.setHours(hour, minute , 0);
        if (day < endDate && day >= startDate) {
          const color = this.usersColors[this.meetings[i].user.username];
          return {'background-color': color, 'border': `${color} 1px solid`};
        }
      }
    }
  }

  getTooltip(time: string, day: Date) {
    if (this.mode === this.SHOWING) {
      for (let i = 0; i < this.meetings.length; i++) {
        const startDate = new Date(this.meetings[i].startDate);
        const endDate = new Date(this.meetings[i].endDate);
        const hour = Number(time.split(':')[0]);
        const minute = Number(time.split(':')[1]);
        day.setHours(hour, minute , 0);
        if (day < endDate && day >= startDate) {
          const color = this.usersColors[this.meetings[i].user.username];
          return `${this.meetings[i].name} ${this.meetings[i].user.username}` ;
        }
      }
    }
  }

  getMeetings() {
    this._store.select(state => state.calendar.meetings).subscribe(meetings => {
      this.meetings = meetings;
      const users = meetings.map(meeting => meeting.user.username);
      const usersUniqe = Array.from(new Set(users));
      this.usersColors = usersUniqe.reduce((acc, val, index) => {
        acc[val] = this.COLORS[index];
        return acc;
      }, {});
    });
  }

  getWeek() {
    return this.dates;
  }

  setWeek() {
    const firstDayOfWeek = moment().startOf('week').toDate();
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(firstDayOfWeek);
      nextDay.setDate(firstDayOfWeek.getDate() + i)
      this.dates.push(nextDay)
    }
  }

  getHours() {
    const hours = Array.from({
      length: 48
    }, (_, hour) => moment({
        hour: Math.floor(hour / 2),
        minutes: (hour % 2 === 0 ? 0 : 30)
      }).format('HH:mm')
    );
    this.HOURS = hours.slice(18, 47);
  }

}
