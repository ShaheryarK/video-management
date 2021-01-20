import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';

import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/models/interfaces/video';

@Component({
  templateUrl: './delete.dialog.component.html',
  styleUrls: ['./delete.dialog.component.scss']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Video, public dataService: VideoService) {
                console.log({data});
               }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.delete(this.data.id).toPromise().then(res=>{
      console.log({res});
      this.dialogRef.close(1);
    });;
  }
}
