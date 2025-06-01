import {AfterViewInit, Component, input, OnInit} from '@angular/core';
import {ProductoCarrito} from '../../../shared/models/producto-carrito';
import {CurrencyPipe} from '@angular/common';
import {Producto} from '../../../shared/models/producto.model';

@Component({
  selector: 'app-producto-vender',
  imports: [CurrencyPipe],
  templateUrl: './producto-vender.component.html',

})
export class ProductoVenderComponent implements OnInit ,AfterViewInit {
  // Esto hace que angular provea los datos del producto a vender
  // En este caso, se espera que el componente padre le pase un producto a vender
  //Cambiar el tipo de dato
  productoVender=input.required<ProductoCarrito>();


  ngOnInit() {
    initFlowbite()

  }
  ngAfterViewInit() {
    if (typeof initFlowbite === 'function') {
      initFlowbite();
    }
  }


}
