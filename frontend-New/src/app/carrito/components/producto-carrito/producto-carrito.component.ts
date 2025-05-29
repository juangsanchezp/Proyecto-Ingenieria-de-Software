import { Component, EventEmitter, input, OnInit, output, Output } from '@angular/core';
import { ProductoCarrito } from '../../../shared/models/producto-carrito';
import { CartService } from '../../../shared/services/carrito-productos.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-producto-carrito',
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './producto-carrito.component.html',

})

export class ProductoCarritoComponent implements OnInit {
  constructor(private carritoService: CartService) {} // Inyecta el servicio

  productoCarrito=input.required<ProductoCarrito>();
  total: number = 0;

  updateCartEvent = output<void>();

  ngOnInit(): void {
    this.actualizarTotal()
  }


  private actualizarTotal(): void {
    this.total= this.productoCarrito().producto!.precio * this.productoCarrito().cantidad;

  }


  incrementarAlCarrito(): void {
    //Esto se puede cambiar para trabajarlo directamente con el back
    //pero por ahora lo mantendre en localstorage
    console.log(this.carritoService.addToCart(this.productoCarrito().producto!, 1));
    this.actualizarTotal();
    this.updateCartEvent.emit(); // Emitir el evento para actualizar el carrito
  }
  decrementarAlCarrito(): void {

    const existingProduct = this.productoCarrito().producto;
    this.carritoService.decreaseProductFromCart(existingProduct!.id);
    this.actualizarTotal();
    this.updateCartEvent.emit(); // Emitir el evento para actualizar el carrito
  }

  removerDelCarrito(): void {
    this.carritoService.removeFromCart(this.productoCarrito().producto!.id);
    this.updateCartEvent.emit(); // Emitir el evento para actualizar el carrito
  }

}

