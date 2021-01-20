import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { Video } from 'src/app/models/interfaces/video';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './detail.dialog.component.html',
  styleUrls: ['./detail.dialog.component.scss']
})

export class DetailDialogComponent {
  baseUrl = environment.baseUrl
  hide:boolean = true;
  constructor(public dialogRef: MatDialogRef<DetailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Video) {
               }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
