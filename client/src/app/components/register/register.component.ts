import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  message;
  messageClass;
  processing = false;

  emailValid;
  emailMessage="email message";

  usernameValid;
  usernameMessage;

  dirty;

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService
  ) {
    this.crateform();
  }

  crateform() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validateUsername
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validatePassword
      ])],
      confirm: ['', Validators.required]

    }, { validator: this.matchingPasswords('password', 'confirm') })
  }

  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { validateEmail: true };
    }
  }
  validateUsername(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { validateUsername: true }
    }
  }
  validatePassword(controls) {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { validatePassword: true };
    }
  }

  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return { 'matchingPasswords': true };
      }
    }
  }



  onregister() {
    
    const user = {
      email:this.form.get('email').value,
      username:this.form.get('username').value,
      password:this.form.get('password').value
    };
    this.authService.registerUser(user).subscribe(data => {
      if(!data.success){
        this.messageClass="alert alert-danger";
        this.message=data.message;
        this.processing = false;
      }else{
        this.messageClass="alert alert-success";
        this.message=data.message;
        this.processing = true;
      }
    });
  }
  checkEmail(){
    this.authService.checkEmail(this.form.get('email').value).subscribe(data => {
      if(!data.success){
        this.emailValid = false;
        this.emailMessage = data.message;
      }else{
        this.emailValid = true;
        this.emailMessage = data.message;
      }
    });
  }

  checkUser(){
    this.authService.checkUsername(this.form.get('username').value).subscribe(data => {
      if(!data.success){
        this.usernameValid = false;
        this.usernameMessage = data.message;
      }else if(data.success){
        this.usernameValid = true;
        this.usernameMessage = data.message;
      }
    });
  }
  



  ngOnInit() {
  }

}
