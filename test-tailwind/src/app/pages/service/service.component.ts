import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Housinglocation } from '../../housinglocation';
import { HousingService } from '../../housing.service';
import { LocationPageComponent } from '../location-page/location-page.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [LocationPageComponent, RouterLink, RouterLinkActive, RouterOutlet, NavbarComponent, CommonModule],
  // templateUrl: './service.component.html',
  template: `
  <app-navbar></app-navbar>
  <div class="">
    <section class="results">
      <app-location-page
        *ngFor="let housingLocation of housingLocationList"
      [housingLocation]="housingLocation"></app-location-page>
    </section>
    </div>
  `,
  styleUrl: './service.component.css'
})
export class ServiceComponent {

   housingLocationList: Housinglocation[] = [];
   housingService: HousingService = inject(HousingService);
 
 constructor() {
   this.housingLocationList = this.housingService.getAllHousingLocations();
 }
}
