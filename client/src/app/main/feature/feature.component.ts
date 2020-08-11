import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {
  selected = new FormControl(0);

  constructor() { }

  ngOnInit(): void {
  }

  changeTabToUsersListen() {
    this.selected.setValue(1);
  }

}
