import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarReducer } from '../store/interfaces';
import { map } from 'rxjs/operators';
import { Meeting } from '../../shared/interfaces/meeting.interface';
import * as moment from 'moment';
import { MeetingService } from './meeting.service';
import * as MeetingActions from '../store/actions/meeting.action';

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
  newMeetings = {};
  meetingsArrang = {};
  SHOWING = 0;
  ADDING = 1;
  mode = this.SHOWING;
  selectedDay: Date;
  selectedHour: string;
  hovereddDay: Date;
  hoveredHour: string;
  groupId: number;

  constructor(private _store: Store<{calendar: CalendarReducer}>,
              private _service: MeetingService) { }

  ngOnInit(): void {
    this.getHours();
    this.getMeetings();
    this.setWeek();
    this.getGroup();
  }

  getGroup() {
    this._store.select(store => store.calendar.group).subscribe(group => {
      if (group) {
        this.groupId = group.id;
      }
    });
  }

  hoverHour(day: Date, time: string) {
    if (this.mode === this.ADDING) {
      this.hovereddDay = day;
      this.hoveredHour = time;
    }
  }

  selectHour(day: Date, time: string) {
    if (this.mode === this.ADDING) {
      if (!this.selectedDay && !this.selectedHour) {
        this.selectedDay = new Date(day);
        this.selectedHour = time;
      } else {
        if (this.selectedDay.getDate() !== day.getDate()) {
          console.log('[INFO] YOU MUST PICK THE SAME DAY')
        } else if (
          Number(this.selectedHour.split(':')[0]) >= Number(time.split(':')[0])
          || (Number(time.split(':')[0]) == Number(this.selectedHour.split(':')[0]) && Number(this.selectedHour.split(':')[1]) >= Number(time.split(':')[1]))
        ) {
          console.log('[INFO] YOU MUST PICK END TIME AFTER STARTING TIME')
        } else {
          this.saveMeeting(day, time);
        }
        this.selectedDay = null;
        this.selectedHour = null;
      }
    }
  }

  saveMeeting(day: Date, time: string) {
    this.selectedDay.setHours(Number(this.selectedHour.split(':')[0]));
    this.selectedDay.setMinutes(Number(this.selectedHour.split(':')[1]));
    day.setHours(Number(time.split(':')[0]));
    day.setMinutes(Number(time.split(':')[1]));
    if (this.groupId) {
      this._service.createMeeting({name: 'Meeting', startDate: this.selectedDay, endDate:day, groupId: this.groupId}).subscribe(res => {
        this._store.dispatch(MeetingActions.getMeetings({groupId: this.groupId}));
      });
    } else {
      console.log('[INFO] NO GROUP SELECTED');
    }
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
    } else {
      const color = this.COLORS[1];
      if (this.selectedHour && this.selectedDay && time === this.selectedHour && day.getDate() === this.selectedDay.getDate()) {
        return {'background-color': color, 'border': `${color} 1px solid`};
      } else if (
        this.selectedHour && this.selectedDay && this.hoveredHour && day.getDate() === this.selectedDay.getDate() && day.getDate() === this.hovereddDay.getDate() && (
          this.isHourGraterThan(this.hoveredHour, time) && this.isHourGraterThan(time, this.selectedHour)
        )
      ) {
        return {'background-color': color, 'border': `${color} 1px solid`};
      }
    }
  }

  isHourGraterThan(hour: string, than: string) {
    return Number(hour.split(':')[0]) > Number(than.split(':')[0])
            || (
              Number(hour.split(':')[0]) === Number(than.split(':')[0])
              && Number(hour.split(':')[1]) >= Number(than.split(':')[1]
            )
          );
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
      // meetings.forEach(meeting => {
      //   const startDate = new Date(meeting.startDate);
      //   const endDate = new Date(meeting.endDate);
      //   console.log(startDate.getDate())
      //   if (this.newMeetings.hasOwnProperty(startDate.getDate())) {

      //   }
      // })
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
