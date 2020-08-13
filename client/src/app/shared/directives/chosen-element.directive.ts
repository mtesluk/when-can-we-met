import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[chosenElement]'
})
export class ChosenElementDirective {

  @Input('chosenElement')  set setColor(value) {
    this.color = value ? this.COLOR : null;
  };

  @HostBinding('style.background-color') color: string;

  COLOR: string = 'rgba(19, 168, 179, 0.548)';

  constructor() { }

}
