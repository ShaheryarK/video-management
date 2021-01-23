import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { NestedCategory } from 'src/app/models/interfaces/category';

@Component({
  templateUrl: './edit.dialog.component.html',
  styleUrls: ['./edit.dialog.component.scss'],
})
export class EditDialogComponent {
  tempCat: any;
  categories: NestedCategory[] = [];
  loading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NestedCategory,
    private dataService: CategoryService
  ) {
    this.tempCat = JSON.parse(JSON.stringify(data));
    if (this.tempCat.parent == null) {
      this.tempCat.parent = { id: 'None' };
      console.log(this.tempCat);
    }
    this.dataService
      .findAll()
      .toPromise()
      .then((res) => {
        this.categories = res;
      });
  }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  submit() {
    this.loading = true;
    console.log(this.tempCat);
    let formData: any = {};
    formData.title = this.tempCat.title;

    console.log(formData);
    if (this.tempCat.parent.id == 'None') {
      formData.parent = null;
    }else{
      formData.parent = this.tempCat.parent.id;
    }
    console.log({ formData });
    this.dataService.update(this.tempCat.id,formData)
      .toPromise()
      .then((res) => {
        console.log({ res });
        this.loading = false;
        this.dialogRef.close(1);
      }).catch(error=>{
        this.loading = false;
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
