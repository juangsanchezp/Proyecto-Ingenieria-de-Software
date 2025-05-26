import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model'; // Ajusta la ruta de importación según sea necesario
import { ProductoCarrito } from '../models/producto-carrito';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: ProductoCarrito[] = [];

  constructor() { }

  addToCart(product: Producto, cantidad: number): string {
    const existingProduct = this.cart.find(item => item.producto.id === product.id);

    if (existingProduct) {
      if (existingProduct.cantidad + cantidad > product.cantidadDisponible) {
        return 'No hay suficiente stock disponible.';
      }
      existingProduct.cantidad += cantidad;
    } else {
      if (cantidad > product.cantidadDisponible) {
        return 'No hay suficiente stock disponible.';
      }
      this.cart.push({ producto: product, cantidad: cantidad });
    }
    return 'Producto agregado al carrito.';
  }

  removeFromCart(productoId: number) {
    this.cart = this.cart.filter(item => item.producto.id !== productoId);
  }
  decreaseProductFromCart(productoId: number) {
  const item = this.cart.find(p => p.producto.id === productoId);
  if (item && item.cantidad > 1) {
    item.cantidad -= 1;
  }
  }

  getCart() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
  }
}
