import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
// import { settings } from 'cluster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  message;
  messageClass;
  processing = false;


  form: FormGroup;


  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private router : Router
  ) {
    this.createForm();
  }


  createForm() {
    this.form = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  disableForm() {
    this.form.controls['username'].disable();
    this.form.get('password').disable();
  }
  enableForm() {
    this.form.controls['username'].enable();
    this.form.get('password').enable();
  }

  onLoginSubmit() {
    this.disableForm();
    this.processing = true;
    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    };
    this.authService.login(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message + data.username;
        this.processing = true;
        this.disableForm();
        this.authService.storeUserData(data.token ,data.user);
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
        
      }
    });
  }




  ngOnInit() {
  }

}
