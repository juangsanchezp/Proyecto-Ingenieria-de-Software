import { Component } from '@angular/core';
import { RouterEvent, RouterLink } from '@angular/router';
import {CartService} from '../../services/carrito-productos.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  //Se inicializa el servicio de carritoService
  constructor(private carritoService:CartService) {}

  iscarritoVacio(){
    return this.carritoService.cantidadProductoEnCarrito()==0;
  }

  obtenerNumeroDeProductosEnCarrito(): number {
    return this.carritoService.cantidadProductoEnCarrito();
  }

}
