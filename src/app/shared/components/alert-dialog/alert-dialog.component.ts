import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

export interface DialogData {
  content: string;
}
@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
