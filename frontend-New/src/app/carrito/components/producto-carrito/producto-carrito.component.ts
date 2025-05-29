import {Component, EventEmitter, input, OnInit, output, Output, signal} from '@angular/core';
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

  // Esto hace que angular provea los datos del producto en el carrito
  productoCarrito=input.required<ProductoCarrito>();
  total: number = 0;

  // Evento para actualizar el carrito
  updateCartEvent = output<void>();

  mensaje = signal<string>(''); // ✅ Para mostrar el resultado al usuario

  ngOnInit(): void {
    this.actualizarTotal()
  }


  private actualizarTotal(): void {
    this.total= this.productoCarrito().producto!.precio * this.productoCarrito().cantidad;

  }


  incrementarAlCarrito(): void {
    //Esto se puede cambiar para trabajarlo directamente con el back
    //pero por ahora lo mantendre en localstorage

    const result = this.carritoService.addToCart(this.productoCarrito().producto!, 1);
    // Verifica si el producto tiene stock disponible
    if (result === 'No hay suficiente stock disponible.') {
      this.mensaje.set('❌ No hay suficiente stock disponible.');
      this.limpiarMensaje();
    }

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
  private limpiarMensaje(): void {
    setTimeout(() => {
      this.mensaje.set('');
    }, 3000); // Limpia el mensaje después de 3 segundos
  }

}

