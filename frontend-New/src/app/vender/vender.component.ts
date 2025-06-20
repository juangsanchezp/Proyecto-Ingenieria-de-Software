import {ProductoCarrito} from '../shared/models/producto-carrito';
import {ProductoVenderComponent} from './producto-vender/producto-vender.component';

import {Component, OnInit} from '@angular/core';
import {ProductoService} from '../shared/services/producto.services';
import {UsuarioService} from '../shared/services/usuario.services';
import {Producto} from '../shared/models/producto.model';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-vender',
  imports: [ProductoVenderComponent, FormsModule, CommonModule],
  templateUrl: './vender.component.html',
})
export class VenderComponent implements OnInit {

  productosVender: Producto[] = [];
  constructor(
    private productoService: ProductoService,
    private usuarioService: UsuarioService
  ) {}

  // Variables para el alert
  alertType: 'success' | 'error' = 'success';
  alertMessage = '';
  showAlert = false;

  // Variables para el input file y producto nuevo
  imagePreviews: string[] = [];
  selectedFiles: File[] = [];
  productoEditado: any = {};

  nuevoProducto: any = {
    nombreProducto: '',
    categoria: '',
    descripcion: '',
    precio: '',
    cantidadDisponible: '',
    proveedorUsuario: '',
    imagenUrl: "",
  };
  imagen= null;

  onFileSelected(event: Event, fileInput: HTMLInputElement) {
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFiles = [];
      this.imagePreviews = [];

      const file = fileInput.files[0];
      this.selectedFiles.push(file);

      // Previsualización de la imagen
      const objectUrl = URL.createObjectURL(file);
      this.imagePreviews.push(objectUrl);

      this.imagen = null;
    }
  }

  removeImage(index: number) {
    this.imagePreviews.splice(index, 1);
    this.selectedFiles.splice(index, 1);
    this.imagen = null;
  }

  agregarProducto() {

    //añadir el nombre del usuario al nuevo producto
    this.nuevoProducto.proveedorUsuario = this.usuarioService.getIdUsuario();

    const formData = new FormData();
    formData.append('producto', JSON.stringify(this.nuevoProducto));  // Convertir el objeto a JSON
    if (this.selectedFiles.length > 0) {
      formData.append('imagen', this.selectedFiles[0]);
    }

    this.productoService.crearProducto(formData).subscribe({
      next: (res) => {
        this.mostrarAlerta('success', '¡El producto fue creado correctamente!');
        this.nuevoProducto = {
          nombreProducto: '',
          categoria: '',
          descripcion: '',
          precio: '',
          cantidadDisponible: '',
          proveedorUsuario: '',
          imagenUrl: "",
        };
        this.selectedFiles = [];
        this.imagePreviews = [];
        this.actualizarProductosVender();
      },
      error: (err) => {
        this.mostrarAlerta('error', 'Ocurrió un problema al crear el producto. Intenta de nuevo.');
      }
    });
  }

  ngOnInit(): void {
    initFlowbite();
    this.actualizarProductosVender();
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

  mostrarAlerta(type: 'success' | 'error', message: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }
}
