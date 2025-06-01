
import {ProductoCarrito} from '../shared/models/producto-carrito';
import {ProductoVenderComponent} from './components/producto-vender/producto-vender.component';
import {CartService} from '../shared/services/carrito-productos.service';
import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-vender',
  imports: [ProductoVenderComponent],
  templateUrl: './vender.component.html',

})
export class VenderComponent implements OnInit {

  productosVender:ProductoCarrito[]= [];
  constructor(private carritoService: CartService) {}


  ngOnInit(): void {
    initFlowbite();
    this.actualizarProductosVender()
  }



  actualizarProductosVender(): void {
    this.productosVender = this.carritoService.getCart();
  }


}
