import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import {filter} from 'rxjs';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  mostrarNavbar: boolean = true;

  constructor(private router: Router) {
    //this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }


  ngOnInit(): void {

    //Logica para mostrar u ocultar la navbar dependiendo de la ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Ocultar navbar cuando la ruta es '/login' o '/signup'
      this.mostrarNavbar = !(event.urlAfterRedirects === '/login' || event.urlAfterRedirects === '/signup');
    });
  }

}
