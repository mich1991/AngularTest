import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  showPassword: boolean = false;
  emailRegx =
    /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  userForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', Validators.required],
    phoneNumber: [''],
    email: ['', [Validators.pattern(this.emailRegx)]],
    hobbies: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  onSubmit(): void {
    console.log(this.userForm);
  }
}
