import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { RegisterUser } from 'src/app/models/interfaces/user-register';

@Component({
  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.scss'],
})
export class AddDialogComponent {
  hide: boolean = true;
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RegisterUser,
    public dataService: UserService
  ) {}

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
    console.log(this.data);
    this.loading = true;
    this.dataService
      .registerUser(this.data)
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
