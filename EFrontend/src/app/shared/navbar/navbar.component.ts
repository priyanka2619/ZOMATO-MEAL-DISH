import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isSearchActive: boolean = false;
  loggedUserData: any;

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn: any) => {
      if (isLoggedIn) {
        this.updateLoggedUserData();
      } else {
        this.loggedUserData = null;
      }
    });
  }

  private updateLoggedUserData() {
    let localStorageData = localStorage.getItem('user_data');
    if (localStorageData != null) {
      this.loggedUserData = JSON.parse(localStorageData);
    }
  }

  onSearchFocus() {
    this.isSearchActive = true;
  }

  onSearchBlur() {
    this.isSearchActive = false;
  }

  navigateTologin() {
    this.router.navigate(['/login']);
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  logout() {
    localStorage.removeItem('user_data');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.authService.setLoggedIn(false); // Notify other components
    this.router.navigate(['/login']);
  }
}
