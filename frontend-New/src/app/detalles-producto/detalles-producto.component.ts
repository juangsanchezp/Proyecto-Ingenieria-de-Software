import { Component, input, OnInit } from '@angular/core';
import { Producto } from '../shared/models/producto.model';
import { ProductoService } from '../shared/services/producto.services';
import { CurrencyPipe } from '@angular/common';
import { ProductoCarrito } from '../shared/models/producto-carrito';
import { CartService } from '../shared/services/carrito-productos.service';

@Component({
  selector: 'app-detalles-producto',
  imports: [CurrencyPipe],
  templateUrl: './detalles-producto.component.html',
  
})
export class DetallesProductoComponent implements OnInit {
  //Esto hace que angular provea los id del producto
  id=input<string>("");
  // Esto hace que angular provea el producto completo
  producto?:Producto;
  
  constructor(private productoService: ProductoService,private carritoService: CartService) {} // Inyecta el servicio
 
  ngOnInit():void {

    //Aquí se obtiene el producto por su ID con el back
    this.productoService.getProductoById(this.id()).subscribe(producto => {
      this.producto = producto;
    });
    
  }

  agregarAlCarrito(): void {
    //Esto se puede cambiar para trabajarlo directamente con el back
    //pero por ahora lo mantendre en localstorage
    console.log(this.carritoService.addToCart(this.producto!, 1));
    
    

  }

}
