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
  addEmailField: boolean = true;
  addHobbyField: boolean = false;

  addEmailRequired: boolean = false;
  addPhoneRequired: boolean = false;

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

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  onSubmit(): void {
    console.log(this.userForm);
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
      }
    });
  }
}
