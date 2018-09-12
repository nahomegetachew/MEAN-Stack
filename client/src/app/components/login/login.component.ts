import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
import { AuthGuard } from '../../guards/auth.guard';

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

  previousUrl;


  form: FormGroup;


  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard
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
        this.message = data.message;
        this.processing = true;
        this.disableForm();
        this.authService.storeUserData(data.token, data.user);
        setTimeout(() => {
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl]);
            this.previousUrl = undefined;
          } else {
            this.router.navigate(['/dashboard']);
          }
        }, 2000); 

      }
    });
  }




  ngOnInit() {
    if (this.authGuard.redirectUrl) {
      this.messageClass = "alert alert-danger";
      this.message = "you must be loged in to view that page";
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
  }

}
