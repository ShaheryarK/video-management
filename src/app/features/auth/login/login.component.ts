import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isError:boolean = false;
  errorMessage:string="Invalid Username or Password";
  loginForm = this.fb.group({
    username: [null,Validators.required],
    password: [null,Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  get f() {
    return this.loginForm.controls;
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }
  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .login(this.f.username.value, this.f.password.value)
      .toPromise().then((res) => {
        this.router.navigate(['/dashboard']);
        this.isError = false;
      }).catch(error=>{
        this.isError = true;
      });
  }
}
