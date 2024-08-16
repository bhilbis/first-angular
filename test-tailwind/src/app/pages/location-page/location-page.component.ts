import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Housinglocation } from '../../housinglocation';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-location-page',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="housingLocation.photo" alt="Exterior photo of {{housingLocation.name}}">
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>
      <p class="listing-location">{{ housingLocation.city}}, {{housingLocation.state }}</p>
    </section>
  `,
  styleUrl: './location-page.component.css'
})
export class LocationPageComponent {
  @Input() housingLocation!: Housinglocation
}
