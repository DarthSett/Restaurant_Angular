import { Component, OnInit } from '@angular/core';
import { LoginDetails } from '../login-details';
import { LoginService } from '../login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passFormControl = new FormControl(
    '', [
      Validators.required
    ]
  );
  roles = ['Restaurant Owner', 'Admin' , 'Super Admin'];
  jwtHelper = new JwtHelperService();

  constructor(
    private loginDetails: LoginDetails,
    private cs: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginDetails.role = this.roles[2];
  }


  show() {
    this.loginDetails.rank = this.roles.indexOf(this.loginDetails.role).toString();
    console.log(this.loginDetails);
    this.cs.login(this.loginDetails).subscribe((resp) => {
        console.log(resp);
        window.localStorage.setItem('token', resp.token);
        this.router.navigate(['']);
        console.log(window.localStorage.getItem('token'));
        console.log(this.jwtHelper.isTokenExpired(resp.token));
      }, err => console.log(err));
  }

}
