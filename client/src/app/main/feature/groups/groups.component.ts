import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  @Output() changeTabToUsers = new EventEmitter<null>();

  constructor() { }

  ngOnInit(): void {
  }

  changeTabToUsersListen() {
    this.changeTabToUsers.next();
  }

}
