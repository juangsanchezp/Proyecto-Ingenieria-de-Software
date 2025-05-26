import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductoCarritoComponent } from "./components/producto-carrito/producto-carrito.component";
import { ProductoCarrito } from '../shared/models/producto-carrito';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../shared/services/carrito-productos.service';

@Component({
  selector: 'app-carrito',
  imports: [RouterLink, ProductoCarritoComponent,CurrencyPipe],
  templateUrl: './carrito.component.html',
})
export class CarritoComponent implements OnInit {
  constructor(private carritoService: CartService) {}
  carritoProductos:ProductoCarrito[]= [];
  total: number = 0;

  ngOnInit(): void {
    initFlowbite();
    this.actualizarCarrito();
    


  }

    actualizarCarrito(): void {
      this.carritoProductos = this.carritoService.getCart();

    //Calculando le total
    this.total = this.carritoProductos.reduce((acc, val) =>acc + val.producto.precio * val.cantidad,0); {
    }}
    
  
}
