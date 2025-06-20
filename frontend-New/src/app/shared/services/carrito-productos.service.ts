import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model'; // Ajusta la ruta de importación según sea necesario
import { ProductoCarrito } from '../models/producto-carrito';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: ProductoCarrito[] = [];
  private readonly STORAGE_KEY = 'cart';

  constructor() {
    // Cargar carrito del sessionStorage al iniciar el servicio
    this.loadCartFromSessionStorage();
  }

  private saveCartToSessionStorage() {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cart));
  }

  private loadCartFromSessionStorage() {
    const data = sessionStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.cart = JSON.parse(data);
    }
  }

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
    this.saveCartToSessionStorage();
    return 'Producto agregado al carrito.';
  }

  removeFromCart(productoId: number) {
    this.cart = this.cart.filter(item => item.producto.id !== productoId);
    this.saveCartToSessionStorage();
  }

  decreaseProductFromCart(productoId: number) {
    const item = this.cart.find(p => p.producto.id === productoId);
    if (item && item.cantidad > 1) {
      item.cantidad -= 1;
      this.saveCartToSessionStorage();
    }
  }

  getCart() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
    this.saveCartToSessionStorage();
  }

  cantidadProductoEnCarrito(): number {
    return this.cart.reduce((total, item) => total + item.cantidad, 0);
  }

  cantidadProductoEnCarritoPorId(productoId: number): number {
    const item = this.cart.find(p => p.producto.id === productoId);
    return item ? item.cantidad : 0;
  }
}
