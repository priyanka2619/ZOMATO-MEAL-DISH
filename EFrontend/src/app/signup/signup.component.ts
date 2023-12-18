import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    mobile: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });
  constructor(private appService: AppService,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit(): void {
  }

  onSignup() {
    let req = {
      'name': this.signupForm.get('name')!.value,
      'mobile': this.signupForm.get('mobile')!.value,
      'email': this.signupForm.get('email')!.value,
      'password': this.signupForm.get('password')!.value,
    }

    this.appService.createSignup(req).subscribe((resp: any) => {
      if (resp.statusCode == 201) {
        this.alertService.success(resp.message);
        this.signupForm.reset()
        this.router.navigate(['/login'])
      }
    },
      error => {
        this.alertService.error(error.error.detail)
      });
  }

}
