import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Video } from 'src/app/models/interfaces/video';
import { VideoService } from 'src/app/services/video.service';
import { CategoryService } from 'src/app/services/category.service';
import { NestedCategory } from 'src/app/models/interfaces/category';

@Component({
  templateUrl: './edit.dialog.component.html',
  styleUrls: ['./edit.dialog.component.scss']
})
export class EditDialogComponent {
  categories:NestedCategory[] = [];

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Video, public dataService: VideoService,    private categoryService: CategoryService
              ) {
                this.categoryService.findAll().toPromise().then(res=>{
                  this.categories = res;
                })
               }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.update(this.data.id,this.data).toPromise().then(res=>{
      console.log({res});
      this.dialogRef.close(1);
    });;
  }
}
