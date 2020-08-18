import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { NotificationService } from '../../../shared/directives/notification.service';

export interface DialogData {
    username: string;
    password: string;
}

@Component({
    selector: 'register-dialog',
    templateUrl: 'register-dialog.html',
    styleUrls: ['register-dialog.scss'],
})
export class RegisterDialog implements OnInit{
    userForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        passwordConfirmation: new FormControl('', Validators.required),
    });

    constructor(
        public dialogRef: MatDialogRef<RegisterDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private _service: AuthService,
        private _notoficationService: NotificationService,
    ) {}

    ngOnInit() {
        this.userForm.setValidators(this._comparisonValidator());
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        if (this.userForm.valid) {
            this._service.register({username: this.userForm.value.username, password: this.userForm.value.password}).subscribe(() => {
                this._notoficationService.notify$.next('You are registered. Now please sign in')
                this.dialogRef.close();
            },
            err => {
                err.error.message.forEach(element => {
                    this.userForm.get(element.fieldName).setErrors({message: element.message});
                });
                this._notoficationService.notify$.next('Error occured');
            });
        }
    }

    private _comparisonValidator() : ValidatorFn {
        return (group: FormGroup): ValidationErrors => {
           const control1 = group.controls['password'];
           const control2 = group.controls['passwordConfirmation'];
           if (control1.value !== control2.value) {
              control2.setErrors({message: 'Not equivalent passwords'});
           } else {
              control2.setErrors(null);
           }
           return;
     };
  }
}