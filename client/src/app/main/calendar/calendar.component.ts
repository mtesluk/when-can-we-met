import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import * as MeetingActions from '../store/actions/meeting.action';
import { Meeting } from '../../shared/interfaces/meeting.interface';
import { MeetingService } from './meeting.service';
import { environment } from '../../../environments/environment';
import { CalendarService } from './calendar.service';
import { CalendarMode } from '../../shared/interfaces/calendar.interface';
import { CalendarReducer } from '../store/interfaces';
import { User } from '../../shared/interfaces/user.interface';
import { NotificationService } from '../../shared/directives/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { AddingMeetingDialog } from './adding-meeting-dialog';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  COLORS = [environment.colors.lightOrange, environment.colors.lightBlue, environment.colors.lightGreen, environment.colors.green, environment.colors.lightRed];
  TIMES = [];
  week: Date[] = [];
  usersColors = {};
  meetings: {[day: number]: {[time: string]: {color: string, text: string}}} = {};
  groupId: number;
  selectedDate: Date;
  selectedTime: string;
  hovereddDay: Date;
  hoveredHour: string;
  mode = CalendarMode.SHOWING;

  constructor(private _store: Store<{calendar: CalendarReducer}>,
              private _meetingService: MeetingService,
              private _service: CalendarService,
              private notificationService: NotificationService,
              public dialog: MatDialog,
            ) { }

  ngOnInit(): void {
    this._generateTimes();
    this._generateWeek();
    this._getMeetings();
    this._getCurrentGroup();
  }

  onSelectTime(day: Date, time: string) {
    if (this.isAddingMode()) {
      if (!this.selectedDate && !this.selectedTime) { // If selected date do not exists it means user choose start date
        this.selectedDate = new Date(day);
        this.selectedTime = time;
      } else { // If selected date exists it means user choose end date
        const startDate = new Date(this.selectedDate);
        const startTime = this.selectedTime;
        const endDate = new Date(day);
        const endTime = time;

        if (startDate.getDate() !== endDate.getDate()) {
          this.notificationService.notify$.next('Only one day meeting are allowed');
        } else if (this._service.isTimeGraterThanTime(startTime, endTime)) {
          this.notificationService.notify$.next('Starting time must be before ending time');
        } else {
          this._saveMeeting(startDate, startTime, endDate, endTime, this.groupId);
        }
        this.selectedDate = null;
        this.selectedTime = null;
      }
    }
  }

  getColor(time: string, day: Date) {
    if (this.isShowingMode()) {
      if (this.meetings.hasOwnProperty(day.getDate()) && this.meetings[day.getDate()].hasOwnProperty(time)) {
        const color = this.meetings[day.getDate()][time].color;
        return {'background-color': color, 'border': `${color} 1px solid`};
      }
    } else {
      const color = this.COLORS[1];
      if (this.selectedTime && this.selectedDate && time === this.selectedTime && day.getDate() === this.selectedDate.getDate()) {
        return {'background-color': color, 'border': `${color} 1px solid`};
      } else if (
        this.selectedTime && this.selectedDate && this.hoveredHour && day.getDate() === this.selectedDate.getDate() && day.getDate() === this.hovereddDay.getDate() && (
          this._service.isTimeGraterThanTime(this.hoveredHour, time) && this._service.isTimeGraterThanTime(time, this.selectedTime)
        )
      ) {
        return {'background-color': color, 'border': `${color} 1px solid`};
      }
    }
  }

  getTooltip(time: string, day: Date) {
    if (this.isShowingMode()) {
      if (this.meetings.hasOwnProperty(day.getDate()) && this.meetings[day.getDate()].hasOwnProperty(time)) {
        return this.meetings[day.getDate()][time].text;
      }
    }
  }

  onHoverTime(date: Date, time: string) {
    if (this.isAddingMode()) {
      this.hovereddDay = date;
      this.hoveredHour = time;
    }
  }

  getCalendarModeType(type: string) {
    switch (type) {
      case 'ADDING': return CalendarMode.ADDING;
      case 'SHOWING': return CalendarMode.SHOWING;
      default: return CalendarMode.SHOWING;
    }
  }

  isAddingMode() {
    return this.mode === CalendarMode.ADDING;
  }

  isShowingMode() {
    return this.mode === CalendarMode.SHOWING;
  }

  setShowingMode() {
    this.mode = CalendarMode.SHOWING;
  }

  private _saveMeeting(startDay: Date, startTime: string, endDay: Date, endTime: String, groupId: number) {
    if (groupId) {
      const startDate = new Date(startDay);
      const splittedStartHour = startTime.split(':').map(part => Number(part));
      const startHour = splittedStartHour[0];
      const startMinute = splittedStartHour[1];
      startDate.setHours(startHour);
      startDate.setMinutes(startMinute);

      const splittedEndHour = endTime.split(':').map(part => Number(part));
      const endDate = new Date(endDay);
      const endHour = splittedEndHour[0];
      const endMinute = splittedEndHour[1];
      endDate.setHours(endHour);
      endDate.setMinutes(endMinute);

      const dialogRef = this.dialog.open(AddingMeetingDialog, {
        data: {startDate, endDate}
      });
  
      dialogRef.afterClosed().subscribe(meetingName => {
        this._meetingService.createMeeting({name: meetingName, startDate, endDate, groupId}).subscribe(res => {
          this.notificationService.notify$.next('Meeting created');
          this._store.dispatch(MeetingActions.getMeetings({groupId}));
          this.setShowingMode();
        });
      });

    } else {
      this.notificationService.notify$.next('No group selected');
    }
  }

  private _getMeetings() {
    this._store.select(state => state.calendar.meetings).subscribe(meetings => {
      this.meetings = {};
      meetings.forEach(meeting => {
        const users = meetings.map(meeting => meeting.user.username);
        this._generateColorsForUsers(users);
        this._generateDetailsOfFrame(meeting);
      });
    });
  }

  private _generateDetailsOfFrame(meeting) {
    const startDate = new Date(meeting.startDate);
    const endDate = new Date(meeting.endDate);
    if (!this.meetings.hasOwnProperty(startDate.getDate())) {
      this.meetings[startDate.getDate()] = {};
    }
    const color = this.usersColors[meeting.user.username];
    const timesOfMeeting = this._service.generateTimes(`${startDate.getHours()}:${startDate.getMinutes()}`, `${endDate.getHours()}:${endDate.getMinutes()}`);
    timesOfMeeting.forEach(time => {
      this.meetings[startDate.getDate()][time] = {
        color: color,
        text: `${meeting.name} ${meeting.user.username}`,
      }
    });
  }

  private _generateColorsForUsers(users: string[]) {
    const usersUniqe = Array.from(new Set(users));
      this.usersColors = usersUniqe.reduce((acc, val, index) => {
        acc[val] = this.COLORS[index];
        return acc;
      }, {});
  }

  private _getCurrentGroup() {
    this._store.select(store => store.calendar.group).subscribe(group => {
      if (group) {
        this.groupId = group.id;
      }
    });
  }

  /*
    @param: nextWeek - tell which next weekend show, 0 means this week
  */
 private _generateWeek(nextWeek: number = 0) {
    const firstDayOfWeek = moment().add(nextWeek,'d').startOf('week').toDate();
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(firstDayOfWeek);
      nextDay.setDate(firstDayOfWeek.getDate() + i)
      this.week.push(nextDay)
    }
  }

  private _generateTimes() {
    this.TIMES = this._service.generateTimes('9:00','23:00');
  }

}
