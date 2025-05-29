import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductoCarritoComponent } from "./components/producto-carrito/producto-carrito.component";
import { ProductoCarrito } from '../shared/models/producto-carrito';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../shared/services/carrito-productos.service';

@Component({
  selector: 'app-carrito',
  imports: [RouterLink, ProductoCarritoComponent, CurrencyPipe],
  templateUrl: './carrito.component.html',
})
export class CarritoComponent implements OnInit {
  carritoProductos: ProductoCarrito[] = [];
  total: number = 0;

  // 🔐 Obtener el usuario desde localStorage
  usuario: string = localStorage.getItem('usuario') || '';

  constructor(private carritoService: CartService) {}

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

  guardarCarrito(): void {
    if (!this.usuario) {
      alert('No se ha detectado un usuario. Asegúrate de haber iniciado sesión.');
      return;
    }

    this.carritoService.guardarCarrito(this.usuario).subscribe({
      next: () => alert("Carrito guardado correctamente"),
      error: err => console.error("Error al guardar el carrito", err)
    });
  }
}
