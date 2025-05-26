import { Component, input } from '@angular/core';
import { Producto } from '../../../shared/models/producto.model';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/carrito-productos.service';

@Component({
  selector: 'app-home-product',
  imports: [RouterLink],
  templateUrl: './home-product.component.html',
})
export class HomeProductComponent {
  
  producto = input.required<Producto>(); 


}
