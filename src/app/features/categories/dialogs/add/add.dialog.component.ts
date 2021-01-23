import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { NestedCategory } from 'src/app/models/interfaces/category';

@Component({
  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.scss'],
})
export class AddDialogComponent {
  categories: NestedCategory[] = [];
  loading:boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NestedCategory,
    private dataService: CategoryService,
  ) {
    this.dataService.findAll().toPromise().then(res=>{
      this.categories =  res;
    })
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
    console.log(this.data);
    let formData:any = {};
    formData.title = this.data.title;
    if(this.data.parent as any == "None")
    {
      formData.parent = null;
    }else{
      formData.parent = this.data.parent;
    }
    console.log({formData});
    this.dataService.save(formData)
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
