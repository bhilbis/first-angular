import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AxiosService } from '../auth/axios.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  // template: `
    
  // `,
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isMenuOpen: boolean = false;
  fullName: string | undefined;

  constructor(private router: Router, private axiosService: AxiosService) {}

  ngOnInit(): void {
    this.fetchUserName();
  }

  fetchUserName(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.axiosService.getUser(+userId).then(
        user => {
          this.fullName = user.fullName;
        },
        error => {
          console.error('Error fetching user data', error);
        }
      );
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
    console.log('Logout berhasil');
  }
}
