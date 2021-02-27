import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationContextComponent } from '@xtream/ngx-validation-errors';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  serverErr:string;
  isValid:boolean = true;
  loginForm = this.fb.group({
    email: ['', { validators: [Validators.required, Validators.email] }

    ],
    password: ['', { validators: [Validators.required, Validators.minLength(5)] }],
  });





  constructor(
    private service: ManagerService, private router: Router, private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    console.log("im here!");
  }

  onSubmitLogin() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;


    this.isValid = true;
    this.service.login(email, password).catch((err: HttpErrorResponse) => {
      console.log('An error occurred:', err.error);
      this.serverErr = err.error.message;
      this.isValid = false;
    }).then(() => {
      if (this.isValid)
        this.gotoHome();
    });

  }

  gotoHome() {
    this.router.navigate(['/notifications']);
  }





}
