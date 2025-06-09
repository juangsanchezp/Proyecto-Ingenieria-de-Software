
import {ProductoCarrito} from '../shared/models/producto-carrito';
import {ProductoVenderComponent} from './components/producto-vender/producto-vender.component';

import {Component, OnInit} from '@angular/core';
import {ProductoService} from '../shared/services/producto.services';
import {UsuarioService} from '../shared/services/usuario.services';
import {Producto} from '../shared/models/producto.model';


@Component({
  selector: 'app-vender',
  imports: [ProductoVenderComponent],
  templateUrl: './vender.component.html',

})
export class VenderComponent implements OnInit {

  productosVender:Producto[]= [];
  constructor(private productoService: ProductoService ,
              private usuarioService: UsuarioService) {}


  ngOnInit(): void {
    initFlowbite();
    this.actualizarProductosVender()
  }



  actualizarProductosVender(): void {
    this.productoService.getProductos().subscribe(productos => {
      const proveedorActual = this.usuarioService.getIdUsuario();
      this.productosVender = productos.filter(producto => producto.proveedorUsuario === proveedorActual);

      // Aplica cache busting a cada imagen
      this.productosVender.forEach(producto => {
        if (producto.imagenUrl) {
          producto.imagenUrl = producto.imagenUrl + '?' + new Date().getTime();
        }
      });
    });
  }


}
