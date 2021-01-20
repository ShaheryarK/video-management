import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/interfaces/user';


@Component({
  templateUrl: './delete.dialog.component.html',
  styleUrls: ['./delete.dialog.component.scss']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User, public dataService: UserService) {
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
