import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductoCarritoComponent } from "./producto-carrito/producto-carrito.component";
import { ProductoCarrito } from '../shared/models/producto-carrito';
import { CartService } from '../shared/services/carrito-productos.service';

@Component({
  selector: 'app-carrito',
  imports: [
    CommonModule,
    RouterLink,
    ProductoCarritoComponent,
    CurrencyPipe
  ],
  templateUrl: './carrito.component.html',
})
export class CarritoComponent implements OnInit {
  carritoProductos: ProductoCarrito[] = [];
  total: number = 0;

  mostrarModal = false;
  mostrarAlertaVacia = false;

  constructor(private carritoService: CartService, private router: Router) {}

  ngOnInit(): void {
    initFlowbite();
    this.actualizarCarrito();
  }

  actualizarCarrito(): void {
    this.carritoProductos = this.carritoService.getCart();
    this.total = this.carritoProductos.reduce(
      (acc, val) => acc + val.producto.precio * val.cantidad,
      0
    );
  }

  abrirModalResumen() {
    if (!this.carritoProductos || this.carritoProductos.length === 0) {
      this.mostrarAlertaVacia = true;
      setTimeout(() => this.mostrarAlertaVacia = false, 3000);
      return;
    }
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  confirmarPago() {
    this.mostrarModal = false;
    this.router.navigate(['/payment-form']); // ✅ Ruta corregida
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}



