import {Component, input, OnInit, signal} from '@angular/core';
import { Producto } from '../shared/models/producto.model';
import { ProductoService } from '../shared/services/producto.services';
import { CurrencyPipe } from '@angular/common';
import { ProductoCarrito } from '../shared/models/producto-carrito';
import { CartService } from '../shared/services/carrito-productos.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-detalles-producto',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './detalles-producto.component.html',

})
export class DetallesProductoComponent implements OnInit {
  //Esto hace que angular provea los id del producto
  id=input<string>("");

  // Aquí se define el producto que se va a mostrar
  producto?:Producto;

  mensaje = signal<string>(''); // ✅ Para mostrar el resultado al usuario
  stockDisponible = signal<number>(0); // Signal para el stock disponible

  constructor(private productoService: ProductoService,private carritoService: CartService) {} // Inyecta el servicio

  ngOnInit():void {
    initFlowbite();
    //Aquí se obtiene el producto por su ID con el back
    this.productoService.getProductoById(this.id()).subscribe(producto => {
      this.producto = producto;
      this.actualizarStockDisponible(); // Actualiza el stock disponible al cargar el producto
    });

  }

  agregarAlCarrito(): void {
    const result = this.carritoService.addToCart(this.producto!, 1);
    // Verifica si el producto tiene stock disponible
    if (result === 'No hay suficiente stock disponible.') {
      this.mensaje.set('❌ No hay suficiente stock disponible.');
    } else {
      this.mensaje.set('✅ Producto agregado al carrito.');
      this.actualizarStockDisponible(); // Actualiza el stock disponible después de agregar
    }
    this.limpiarMensaje();
  }
  private limpiarMensaje(): void {
    setTimeout(() => {
      this.mensaje.set('');
    }, 3000); // Limpia el mensaje después de 3 segundos
  }

  // Método para obtener cantidad en carrito de este producto
  protected cantidadEnCarrito(): number {
    if (!this.producto || this.producto.id === undefined || this.producto.id === null) {
      return 0;
    }
    return this.carritoService.cantidadProductoEnCarritoPorId(this.producto.id);
  }

  private actualizarStockDisponible(): void {
    if (!this.producto) {
      this.stockDisponible.set(0);
    } else {
      const cantidadEnCarrito = this.carritoService.cantidadProductoEnCarritoPorId(this.producto.id);
      this.stockDisponible.set(this.producto.cantidadDisponible - cantidadEnCarrito);
    }
  }

}
