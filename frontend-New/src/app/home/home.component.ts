import { Component, OnInit } from '@angular/core';
import{ Producto } from '../shared/models/producto.model';
import { HttpClient } from '@angular/common/http';
import { ProductoService } from '../shared/services/producto.services';
import { HomeProductComponent } from "./components/home-product/home-product.component"; 
import { timeout } from 'rxjs';
@Component({
  selector: 'app-home',
  imports: [HomeProductComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  productos: Producto[] = [];
  
  //Se inicializa el servicio de productos
  constructor(private productoService: ProductoService) {}

  //Se obtiene la lista de productos del back
  getProductos(): void {
    this.productoService.getProductos().subscribe(
      (data: Producto[]) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
    
  }
  ngOnInit(): void {
    setTimeout(() => {
      //Meter aca el initFlowbite() si se implementa el carrusel de productos 
      // por si da error
    },100);

    initFlowbite();
    
    // Llamar al método para obtener los productos al iniciar el componente
    this.getProductos();
     
  } 

}
