import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { ChosenElementDirective } from './directives/chosen-element.directive';


@NgModule({
  declarations: [ChosenElementDirective],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ChosenElementDirective,
  ]
})
export class SharedModule { }
