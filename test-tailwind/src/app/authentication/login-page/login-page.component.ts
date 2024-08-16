import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AxiosService } from '../../auth/axios.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, RouterModule, HttpClientModule, NgIf, FormsModule],
  template: `
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="/favicon.ico" alt="Your Company" />
    <h2
      class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
    >
      Sign in to your account
    </h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form
    (ngSubmit)="login()"
      class="form-group space-y-6"
      action="#"
      method="POST"
    >
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Email address</label
        >
        <div class="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            [(ngModel)] = "email"
            autocomplete="email"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Password</label
          >
          <div class="text-sm">
            <a
              href="#"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
              >Forgot password?</a
            >
          </div>
        </div>
        <div class="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            [(ngModel)] = "password"
            autocomplete="current-password"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>
    </form>
    
    <p class="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <a
      [routerLink]="['/register']"
      class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >Register</a
      >
    </p>
    <p *ngIf="message" class="text-center mt-5 bg-red-600 rounded-lg py-1 px-2">{{ message }}</p>
  </div>
</div>
`,
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private axiosService: AxiosService, private router: Router) {}

  login() {
    this.axiosService.login(this.email, this.password).then(response => {
      console.log('Login berhasil', response);
      if (response && response.accessToken) {
        localStorage.setItem('authToken', response.accessToken);
        localStorage.setItem('userId', response.userId);
        this.router.navigate(['/home']);
      } else {
        this.message = 'Login failed: Access token not found';
      }
    }).catch(error => {
      console.error('Login gagal', error);
      this.message = 'Login gagal';
    });
  }
}
