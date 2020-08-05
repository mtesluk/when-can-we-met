import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupsService } from '../groups.service';


@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  groupForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(private _groupService: GroupsService) { }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.groupForm.valid) {
      this._groupService.createGroup(this.groupForm.value).subscribe(() => {
        // change store state to show groups
      });
    }
  }

}
