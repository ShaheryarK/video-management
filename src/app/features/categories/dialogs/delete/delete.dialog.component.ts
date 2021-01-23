import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { NestedCategory } from 'src/app/models/interfaces/category';

@Component({
  templateUrl: './delete.dialog.component.html',
  styleUrls: ['./delete.dialog.component.scss']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: NestedCategory, public dataService: CategoryService) {
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
