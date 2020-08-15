import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    startDate: Date;
    endDate: Date;
}

@Component({
    selector: 'adding-meeting-dialog',
    templateUrl: 'adding-meeting-dialog.html',
    styleUrls: ['adding-meeting-dialog.scss'],
})
export class AddingMeetingDialog {

    constructor(
        public dialogRef: MatDialogRef<AddingMeetingDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}