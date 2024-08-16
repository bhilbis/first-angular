import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../auth/user.service';
import { AxiosService } from '../../auth/axios.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NgIf,FormsModule],
  // templateUrl: './register-page.component.html',
  template: `
  <div class="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="/favicon.ico" alt="Your Company">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register a new account</h2>
    </div>
  
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" (ngSubmit)="register()" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" [(ngModel)]="user.emailAddress" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" placeholder="Input Email">
          </div>
        </div>
  
        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="mt-2">
            <input id="password" name="password" type="password" [(ngModel)]="user.password" autocomplete="new-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" placeholder="Input Password">
          </div>
        </div>
  
        <!-- <div>
          <label for="confirm-password" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
          <div class="mt-2">
            <input id="confirm-password" name="confirm-password" type="password" autocomplete="new-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" placeholder="">
          </div>
        </div> -->

        <div>
          <label for="fullName" class="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
          <div class="mt-2">
            <input id="fullName" name="fullName" type="text" [(ngModel)]="user.fullName"  required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" placeholder="">
          </div>
        </div>

        <div>
          <label for="companyName" class="block text-sm font-medium leading-6 text-gray-900">Company Name</label>
          <div class="mt-2">
            <input id="companyName" name="companyName" type="text" [(ngModel)]="user.companyName"  required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" placeholder="">
          </div>
        </div>

        <div>
          <label for="telp" class="block text-sm font-medium leading-6 text-gray-900">Telephone</label>
          <div class="mt-2">
            <input id="telp" name="telp" type="text" [(ngModel)]="user.telp"  required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" placeholder="">
          </div>
        </div>
  
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
        </div>
      </form>
  
      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        <a routerLink="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in</a>
      </p>
      <p *ngIf="message" class="bg-red-600 mt-5 text-center rounded-lg py-1 px-2">{{ message }}</p>
    </div>
  </div>
  `,
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  user: any = {
    emailAddress: '',
    password: '',
    fullName: '',
    companyName: '',
    telp: '',
    salt: '',
    roleId: 0,
    roleName: ''
  };
  message: string = '';

  constructor(private axiosService: AxiosService, private router: Router) {}

  register() {
    this.axiosService.register(this.user).then(
      response => {
        console.log('Register berhasil', response);
        this.message = 'Register berhasil';
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Register gagal', error);
        this.message = 'Register gagal';
      }
    );
  }
}
