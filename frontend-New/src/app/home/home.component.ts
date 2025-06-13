import { Component, OnInit } from '@angular/core';
import{ Producto } from '../shared/models/producto.model';
import { HttpClient } from '@angular/common/http';
import { ProductoService } from '../shared/services/producto.services';
import { HomeProductComponent } from "./home-product/home-product.component";
import { timeout } from 'rxjs';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-home',
  imports: [HomeProductComponent,FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  productos: Producto[] = [];

  productosFiltrados: Producto[] = [];
  terminoBusqueda: string = '';
  categoriaSeleccionada: string = '';

  //Se inicializa el servicio de productos
  constructor(private productoService: ProductoService) {}

  //Se obtiene la lista de productos del back
  getProductos(): void {
    this.productoService.getProductos().subscribe(
      (data: Producto[]) => {
        this.productos = data;
        this.filtrarProductos(); // Inicializa el filtrado
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  filtrarProductos(): void {
    // Limpia el filtro de categoría si existe
    this.categoriaSeleccionada = '';
    const termino = this.terminoBusqueda.trim().toLowerCase();
    if (!termino) {
      this.productosFiltrados = this.productos;
      return;
    }
    this.productosFiltrados = this.productos.filter(producto =>
      producto.nombreProducto.toLowerCase().includes(termino) ||
      producto.categoria.toLowerCase().includes(termino)
    );
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    this.terminoBusqueda = '';
    this.productosFiltrados = this.productos.filter(producto =>
      producto.categoria.toLowerCase() === categoria.toLowerCase()
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
