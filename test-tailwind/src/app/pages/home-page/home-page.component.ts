import { Component, HostListener } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AxiosService } from '../../auth/axios.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    CommonModule,
    NavbarComponent,
    FormsModule,
  ],
  template: `
    <section class="justify-center align-middle items-center text-center">
      <form class="mb-6 mt-5">
      <input
          type="text"
          placeholder="Filter by Name"
          class="border border-solid px-3 py-2 border-[#7270CE] rounded-lg inline-block w-[40%] max-md:w-[35%]"
          [ngModel]="filterName"
          name="filterName"
          (input)="filterEquipment()"
        />
        <select
          class="border border-solid px-2 py-2 border-[#7270CE] rounded-lg inline-block w-[20%] max-md:w-[20%] ml-2"
          [(ngModel)]="filterAvailability"
          name="filterAvailability"
          (change)="filterEquipment()"
        >
          <option value="">All Status</option>
          <option value="Available">Available</option>
          <option value="NotAvailable">Not Available</option>
        </select>
        <select
          class="border border-solid px-2 py-2 border-[#7270CE] rounded-lg inline-block w-[15%] max-md:w-[20%] ml-2"
          [(ngModel)]="filterLocation"
          name="filterLocation"
          (change)="filterEquipment()"
        >
          <option value="">All Location</option>
          <option value="Indonesia">Indonesia</option>
          <option value="Singapura">Singapura</option>
          <option value="Jepang">Jepang</option>
        </select>
        <!-- <button
          class="py-2 px-5 ml-2 bg-[#6b69cd] text-white rounded-2xl  dark:hover:bg-[#2d2ac8] "
          type="button"
          (click)="filterEquipment()"
        >
          Search
        </button> -->
      </form>

      <div class="flex justify-end mb-4 md:mr-16 max-md:mr-8">
        <button
          (click)="openCreateForm()"
          class="bg-blue-800 dark:hover:bg-blue-950 rounded-2xl px-4 py-2 text-white"
        >
          Add New Data
        </button>
      </div>

      <div *ngIf="errorMessage" class="text-red-500 mb-4">
        {{ errorMessage }}
      </div>

      <div class="flex flex-wrap justify-center">
    <div
      *ngFor="let equipment of filteredEquipmentList"
      class="card bg-[#243c5a] text-white shadow-md rounded-xl m-4 p-4 w-64"
    >
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-bold">{{ equipment.modelName }}</h3>
        <div class="relative">
          <button
            (click)="toggleMenu(equipment.id)"
            class="focus:outline-none"
          >
            ⋮
          </button>
          <div
            *ngIf="menuOpenId === equipment.id"
            class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg"
          >
            <button
              (click)="editEquipment(equipment)"
              class="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
            >
              Edit
            </button>
            <button
              (click)="deleteEquipment(equipment.id)"
              class="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div (click)="showEquipment(equipment)" class="mt-2 cursor-pointer text-center">
        <p class="">{{ equipment.description }}</p>
      </div>
    </div>
  </div>

  <div
    *ngIf="showForm1"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white py-8 px-20 rounded-lg relative w-96">
      <h2 class="text-xl mb-4">Equipment Details</h2>
      <div class="mb-4">
        <label for="id" class="block mb-2">ID</label>
        <p class="border border-gray-300 px-4 py-2 w-full">{{currentEquipment.id}}</p>
      </div>
      <div class="mb-4">
          <label for="name" class="block mb-2">Name</label>
          <p
            class="border border-gray-300 px-4 py-2 w-full"
          >{{currentEquipment.modelName}}</p>
        </div>
        <div class="mb-4">
          <label for="type" class="block mb-2">Description</label>
          <p
            class="border border-gray-300 px-4 py-2 w-full"
          >{{currentEquipment.description}}</p>
        </div>
        <div class="mb-4">
          <label for="location" class="block mb-2">Location</label>
          <p
            class="border border-gray-300 px-4 py-2 w-full"
          >{{currentEquipment.location}}</p>
        </div>
      <div class="flex justify-end">
        <button
          type="button"
          (click)="closeForm1()"
          class="bg-red-500 text-white py-2 px-4 rounded mr-2"
        >
          Close
        </button>
      </div>
    </div>
  </div>

  <div
    *ngIf="showForm"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white py-8 px-20 rounded-lg w-96">
      <h2 class="text-xl mb-4">
        {{ editMode ? 'Edit Equipment' : 'Add Equipment' }}
      </h2>
      <form (ngSubmit)="saveEquipment()">
        <div class="mb-4">
          <label for="name" class="block mb-2">Name</label>
          <input
            id="name"
            [(ngModel)]="currentEquipment.modelName"
            name="name"
            class="border border-gray-300 px-4 py-2 w-full"
            required
          />
        </div>
        <div class="mb-4">
          <label for="type" class="block mb-2">Description</label>
          <select
            [(ngModel)]="currentEquipment.description"
            name="type"
            class="border border-gray-300 px-4 py-2 w-full"
            required
          >
          <option value="Available">Available</option>
          <option value="NotAvailable">Not Available</option>
        </select>
        </div>
        <div class="mb-4">
          <label for="location" class="block mb-2">Location</label>
          <select
            [(ngModel)]="currentEquipment.location"
            name="location"
            class="border border-gray-300 px-4 py-2 w-full"
            required
          >
            <option value="Indonesia">Indonesia</option>
            <option value="Singapura">Singapura</option>
            <option value="Jepang">Jepang</option>
          </select>
        </div>
        <div *ngIf="formWarningMessage" class="text-yellow-500 mb-1">
          {{ formWarningMessage}}
        </div>
        <div *ngIf="formErrorMessage" class="text-red-500 mb-4">
          {{ formErrorMessage }}
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            (click)="closeForm()"
            class="bg-gray-500 text-white py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-600 text-white py-2 px-4 rounded"
          >
            {{ editMode ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </div>
    </section>
  `,
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  equipmentList: any[] = [];
  filteredEquipmentList: any[] = [];
  showForm: boolean = false;
  showForm1: boolean = false;
  editMode: boolean = false;
  currentEquipment: any = {
    id: null,
    modelName: '',
    description: '',
    location: '',
  };
  errorMessage: string | null = null;
  formErrorMessage: string | null = null;
  formWarningMessage: string | null = null;
  originalEquipment: any = {
    id: null,
    modelName: '',
    description: '',
    location: '',
  };
  menuOpenId: number | null = null;
  filterName: string = '';
  filterLocation: string = '';
  filterAvailability: string = '';

  constructor(private axiosService: AxiosService, private router: Router) {}

  ngOnInit() {
    this.loadEquipment();
  }

  loadEquipment() {
    this.axiosService.getEquipment().then(response => {
      this.equipmentList = response;
      this.filteredEquipmentList = response;
    }).catch(error => {
      if (error.status === 404) {
        console.error('Unauthorized access', error);
        this.router.navigate(['/login']);
      } else {
        console.error('Error fetching equipment data', error);
        this.errorMessage = 'Error fetching equipment data';
      }
    });
  }

  fetchEquipment() {
    this.axiosService
      .getEquipment()
      .then((response) => {
        this.equipmentList = response.data;
        this.filteredEquipmentList = this.equipmentList;
      })
      .catch((error) => {
        this.errorMessage = 'Error fetching equipment data';
        console.error('Error fetching equipment data:', error);
      });
  }

  filterEquipment() {
    this.filteredEquipmentList = this.equipmentList.filter((equipment) => {
      const matchesName = equipment.modelName.toLowerCase().includes(this.filterName.toLowerCase())
      const matchesAvailability = !this.filterAvailability || equipment.description === this.filterAvailability;
      const matchesLocation = !this.filterLocation || equipment.location === this.filterLocation;

      return matchesName && matchesLocation && matchesAvailability;
    });
  }
  

  toggleMenu(id: number) {
    if (this.menuOpenId === id) {
      this.menuOpenId = null;
    } else {
      this.menuOpenId = id;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.menuOpenId = null;
    }
  }

  openCreateForm() {
    this.editMode = false;
    this.currentEquipment = { modelName: '', description: '', location: '' };
    this.showForm = true;
    this.formErrorMessage = null;
    this.formWarningMessage = null;
  }

  editEquipment(equipment: any) {
    this.editMode = true;
    this.currentEquipment = { ...equipment };
    this.originalEquipment = { ...equipment };
    this.showForm = true;
    this.formErrorMessage = null;
    this.formWarningMessage = null;
  }

  showEquipment(equipment: any) {
    this.editMode = false;
    this.showForm1 = true;
    this.currentEquipment = { ...equipment };
    this.originalEquipment = { ...equipment};
  }

  saveEquipment() {
    if (this.editMode) {
      this.updateEquipment();
    } else {
      this.createEquipment();
    }
  }

  createEquipment() {
    if (this.isDuplicate(this.currentEquipment)) {
      this.formErrorMessage = 'Name already exists';
      return;
    }
    if (!this.currentEquipment.modelName || !this.currentEquipment.description || !this.currentEquipment.location) {
      this.formErrorMessage = 'All fields are required!';
      return;
    }
    this.axiosService.addEquipment(this.currentEquipment).then(() => {
      this.loadEquipment();
      this.closeForm();
    }).catch(error => {
      console.error('Error adding equipment', error);
      this.formErrorMessage = 'Error adding equipment';
    });
  }

  updateEquipment() {
    if (this.noChangesDetected()) {
      this.formWarningMessage = 'No changes detected, press cancel in no changes are made'
      return;
    } 

    if(!this.currentEquipment.modelName|| !this.currentEquipment.description || !this.currentEquipment.location){
      this.formErrorMessage = 'All fiels are required!';
      return;
    }
      this.axiosService.updateEquipment(this.currentEquipment).then(() => {
        this.loadEquipment();
        this.closeForm();
      }).catch(error => {
        console.error('Error updating equipment', error);
        this.formErrorMessage = 'Error updating equipment';
      });
  }

  deleteEquipment(id: number) {
    this.axiosService.deleteEquipment(id).then(() => {
      this.loadEquipment();
    }).catch(error => {
      console.error('Error deleting equipment', error);
      this.formErrorMessage = 'Error deleting equipment';
    });
  }

  isDuplicate(equipment: any): boolean {
    return this.equipmentList.some(
      item =>
        item.modelName === equipment.modelName && item.id !== equipment.id
    );
  }

  noChangesDetected(): boolean {
    return (
      this.originalEquipment.modelName === this.currentEquipment.modelName &&
      this.originalEquipment.description ===
        this.currentEquipment.description &&
      this.originalEquipment.location === this.currentEquipment.location
    );
  }

  closeForm1() {
    this.showForm1 = false;
  }

  closeForm() {
    this.showForm = false;
    this.editMode = false;
    this.currentEquipment = {
      id: null,
      modelName: '',
      description: '',
      location: '',
    };
    this.formErrorMessage = null;
    this.formWarningMessage = null;
  }
}
