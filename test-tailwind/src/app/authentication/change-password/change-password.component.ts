import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AxiosService } from '../../auth/axios.service';


@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  // templateUrl: './change-password.component.html',
  template: `
     <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Change Password
        </h2>
      </div>

      <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <div class=" bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <h2 class="font-bold">Peringatan: Untuk mengganti kata sandi, harap perhatikan:</h2>
          <ul class="list-disc list-inside">
            <li>Kata sandi harus memiliki setidaknya 6 karakter</li>
            <li>Harus mengandung setidaknya satu huruf besar dan satu huruf kecil</li>
            <li>Harus mengandung setidaknya satu angka</li>
            <li>Harus mengandung setidaknya satu karakter khusus</li>
          </ul>
        </div>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form (ngSubmit)="changePassword()" class="space-y-6">
          <div>
            <label for="oldPassword" class="block text-sm font-medium leading-6 text-gray-900">
              Old Password
            </label>
            <div class="mt-2">
              <input
                id="oldPassword"
                name="oldPassword"
                type="password"
                [(ngModel)]="oldPassword"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              />
            </div>
          </div>

          <div>
            <label for="newPassword" class="block text-sm font-medium leading-6 text-gray-900">
              New Password
            </label>
            <div class="mt-2">
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                [(ngModel)]="newPassword"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              />
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium leading-6 text-gray-900">
              Confirm Password
            </label>
            <div class="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                [(ngModel)]="confirmPassword"
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
              Change Password
            </button>
          </div>
        </form>
        <p *ngIf="message" class="text-center mt-5 bg-red-600 rounded-lg py-1 px-2">{{ message }}</p>
      </div>
    </div>

  `,
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(private axiosService: AxiosService, private router: Router) {}

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'New password and confirm does not match';
      return;
    }

    this.axiosService.updatePassword(this.oldPassword, this.newPassword).then(
      response => {
        console.log('Response:', response);
        this.message = 'Password changed successfully';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error => {
        console.error('Error changing password', error);
        this.message = error.error || 'Error changing password. Please try again later.';
      }
    );
  }
}