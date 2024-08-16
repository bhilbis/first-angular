import { Component } from '@angular/core';
import { RouterOutlet, } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <section>
        <app-navbar></app-navbar>
        <div class="pt-[72px]">
      <router-outlet></router-outlet>
      </div>
    </section>
    
  `,
})
export class MainLayoutComponent {
  title = 'test-tailwind';
}
