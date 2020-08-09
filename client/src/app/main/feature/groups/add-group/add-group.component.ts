import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CalendarReducer } from '../../../store/interfaces';
import { Store } from '@ngrx/store';
import * as GroupAction from '../../../store/actions/group.action';


@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  groupForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(private _store: Store<{calendar: CalendarReducer}>) { }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.groupForm.valid) {
      this._store.dispatch({type: GroupAction.CREATE_GROUP, group: this.groupForm.value});
    }
  }

}
