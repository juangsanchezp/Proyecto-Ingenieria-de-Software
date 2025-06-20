import { Component, input, signal } from '@angular/core';
import { Producto } from '../../shared/models/producto.model';
import { RouterLink } from '@angular/router';
import { CartService } from '../../shared/services/carrito-productos.service';
import {CommonModule, NgIf} from '@angular/common';
import {UsuarioService} from '../../shared/services/usuario.services';

@Component({
  selector: 'app-home-product',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home-product.component.html',
})
export class HomeProductComponent {
  producto = input.required<Producto>();
  mensaje = signal<string>(''); // ✅ Para mostrar el resultado al usuario

  constructor(private carritoService: CartService ,
              private usuarioService:UsuarioService) {}

  agregarAlCarrito(): void {
    const p = this.producto();

    let productoEnCarrito= this.carritoService.cantidadProductoEnCarritoPorId(p.id);

    // Verifica si el producto tiene stock disponible
    if (p.cantidadDisponible- productoEnCarrito <= 0) {
      this.mensaje.set('❌ No hay suficiente stock disponible.');
      this.limpiarMensaje();
      return;
    }

    // Agrega 1 unidad al carrito
    const result = this.carritoService.addToCart(p, 1);
    if (result === 'No hay suficiente stock disponible.') {
      this.mensaje.set(result);
      this.limpiarMensaje();
      return;
    }


    this.mensaje.set('✅ Producto agregado al carrito. ' + (p.cantidadDisponible - (productoEnCarrito+1) ));
    this.limpiarMensaje();
  }

  private limpiarMensaje(): void {
    setTimeout(() => {
      this.mensaje.set('');
    }, 3000); // Limpia el mensaje después de 3 segundos
  }

  productoPropio(): boolean {
    // Verifica si el producto tiene un idUsuario asociado y si es igual al id del usuario autenticado
    return this.producto().proveedorUsuario === this.usuarioService.getIdUsuario();
  }

}
