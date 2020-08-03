import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  groupForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.groupForm.valid) {
      console.log(this.groupForm.get('name').value);
      this._http.post('/api/v1/groups', this.groupForm.value).subscribe(res => {
        console.log('123');
      })
    }
  }

}
