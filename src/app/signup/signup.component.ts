import { Component, OnInit } from '@angular/core';
import { CustomerDetails } from '../customer-details';
import { LoginService } from '../login.service';
import { MyErrorStateMatcher } from '../login/login.component';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nameFormControl = new FormControl(
    '', [
      Validators.required
    ]
  );
  passFormControl = new FormControl(
    '', [
      Validators.required
    ]
  );
  constructor(
    private customer: CustomerDetails,
    private custService: LoginService,
  ) { }

  ngOnInit() {
  }

  show() {
    console.log(this.customer);
    this.custService.signup(this.customer).subscribe(_ => {
      console.log(_);
    }, err => {console.log(err); });
  }

}

