import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  addPhoneField: boolean = false;
  addEmailField: boolean = false;
  addHobbyField: boolean = false;

  addEmailRequired: boolean = false;
  addPhoneRequired: boolean = false;

  showPassword: boolean = false;

  // REGEX FOR VALIDATIONS
  // Stack overflow
  emailRegx =
    /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  // Stack overflow
  passwordRegx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{7,})/;

  phoneNumberRegx = /^[0-9]*$/;

  // VALIDATORS
  // Błędne podejście , kod zostawiam dla zapoznania z moim 1 sposobem podejścia do problemu.
  phoneNumberValidator = this.addPhoneRequired
    ? [Validators.pattern(this.phoneNumberRegx), Validators.required]
    : [Validators.pattern(this.phoneNumberRegx)];

  emailValidator = this.addEmailRequired
    ? [Validators.pattern(this.emailRegx), Validators.required]
    : [Validators.pattern(this.emailRegx)];

  userForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(this.passwordRegx),
      ],
    ],
    phoneNumber: ['', this.phoneNumberValidator],
    email: ['', this.emailValidator],
    hobbies: [''],
  });

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  onSubmit(): void {
    console.log(this.userForm);
    if (this.userForm.status === 'VALID') {
      console.log('Success!');
    } else {
      console.log('Form Invalid');
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        phone: this.addPhoneField,
        email: this.addEmailField,
        hobbies: this.addHobbyField,
        phoneRequired: this.addPhoneRequired,
        emailRequired: this.addEmailRequired,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // After using Cancel button result may be undefined that's why if statement is here.
      if (result) {
        this.addPhoneField = result.phone;
        this.addEmailField = result.email;
        this.addHobbyField = result.hobbies;
        this.addEmailRequired = result.emailRequired;
        this.addPhoneRequired = result.phoneRequired;
        if (this.addPhoneRequired === true) {
          this.userForm.controls['phoneNumber'].addValidators(
            Validators.required
          );
        } else {
          this.userForm.controls['phoneNumber'].removeValidators(
            Validators.required
          );
        }
        if (this.addEmailRequired === true) {
          this.userForm.controls['email'].addValidators(Validators.required);
        } else {
          this.userForm.controls['email'].removeValidators(Validators.required);
        }
      }
    });
  }
}
