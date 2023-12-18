import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedInUser: any;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,

    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });
  constructor(private appService: AppService,
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    let localStorageData = localStorage.getItem('user_data')
    if (localStorageData != null) {
      this.loggedInUser = JSON.parse(localStorageData)
    }
  }

  onLogin() {
    let req = {
      'email': this.loginForm.get('email')!.value,
      'password': this.loginForm.get('password')!.value,
    }

    this.appService.createLogin(req).subscribe((resp: any) => {
      if (resp.statusCode == 200) {
        this.authService.setLoggedIn(true);
        localStorage.setItem('user_data', JSON.stringify(resp.data.user));
        localStorage.setItem('access_token', JSON.stringify(resp.data.access));
        localStorage.setItem('refresh_token', JSON.stringify(resp.data.refresh));
        this.loggedInUser = resp.data.user
        this.alertService.success(resp.message);
        this.loginForm.reset()
        this.router.navigate(['/foods'])
      }
    },
      error => {
        console.log(error, "error")
        this.alertService.error(error.error.detail)
      });
  }

}
