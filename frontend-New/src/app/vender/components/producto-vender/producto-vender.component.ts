import {AfterViewInit, Component, input, OnInit, output} from '@angular/core';
import {ProductoCarrito} from '../../../shared/models/producto-carrito';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {Producto} from '../../../shared/models/producto.model';
import {FormsModule} from '@angular/forms';
import {ProductoService} from '../../../shared/services/producto.services';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-producto-vender',
  imports: [CurrencyPipe,CommonModule,FormsModule,RouterLink],
  templateUrl: './producto-vender.component.html',

})
export class ProductoVenderComponent implements OnInit ,AfterViewInit {
  // Esto hace que angular provea los datos del producto a vender
  // En este caso, se espera que el componente padre le pase un producto a vender
  //Cambiar el tipo de dato
  productoVender = input.required<Producto>();

  constructor(private productoService: ProductoService) {}

  // Objeto temporal para edición
  productoEditado: any = {};

  imagePreviews: string[] = [];
  selectedFiles: File[] = [];


  //Evento para actualizar el producto
  updateProductosEvent = output<void>();


  dropdownCategoriaOpen = false;


  seleccionarCategoria(categoria: string) {
    this.productoEditado.categoria = categoria;
    this.dropdownCategoriaOpen = false;
  }


  alertType: 'success' | 'error' = 'success';
  alertMessage = '';
  showAlert = false;

  mostrarAlerta(type: 'success' | 'error', message: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  ngOnInit() {
    // Inicializa el objeto con los valores actuales
    this.productoEditado = { ...this.productoVender() };
    initFlowbite();
    this.imagePreviews.push(this.productoVender().imagenUrl || '');
  }

  onFileSelected(event: Event, fileInput: HTMLInputElement) {
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFiles = [];
      this.imagePreviews = [];

      const file = fileInput.files[0];
      this.selectedFiles.push(file);

      // Muestra la imagen en la previsualización (blob)
      const objectUrl = URL.createObjectURL(file);
      this.imagePreviews.push(objectUrl);

      // Limpia la referencia base64 previa
      this.productoEditado.imagen = null;
    }
  }



  removeImage(index: number) {
    this.imagePreviews.splice(index, 1);
    this.selectedFiles.splice(index, 1);
    this.productoEditado.imagen = null;
  }




  actualizarProducto() {
    // Valida que exista una imagen (en archivo)
    const tieneImagen = !!this.productoEditado.imagen || this.imagePreviews.length > 0;
    if (!tieneImagen) {
      this.mostrarAlerta('error', 'Debes subir una imagen para actualizar el producto.');
      return;
    }
    // Agrega los datos del producto al FormData
    const formData = new FormData();
    formData.append('id', this.productoEditado.id);
    formData.append('nombreProducto', this.productoEditado.nombreProducto);
    formData.append('categoria', this.productoEditado.categoria);
    formData.append('descripcion', this.productoEditado.descripcion);
    formData.append('precio', this.productoEditado.precio);
    formData.append('cantidadDisponible', this.productoEditado.cantidadDisponible);
    formData.append('proveedorUsuario', this.productoEditado.proveedorUsuario);

    // Solo agrega la imagen si se seleccionó un archivo
    if (this.selectedFiles.length > 0) {
      formData.append('imagen', this.selectedFiles[0]);
    }

    // Llama al servicio para actualizar el producto
    this.productoService.actualizarProductoFormData(this.productoEditado.id, formData).subscribe({
      next: (response) => {
        this.mostrarAlerta('success', '¡El producto fue actualizado correctamente!');

        // Actualiza el producto en el componente padre
        this.updateProductosEvent.emit();
      },
      error: (error) => {
        this.mostrarAlerta('error', 'Ocurrió un problema al actualizar el producto. Intenta de nuevo.');
      }
    });
  }

  ngAfterViewInit() {
    if (typeof initFlowbite === 'function') {
      initFlowbite();
    }
  }

  abrirModalEdicion() {
    // Reinicia el estado de la edición
    this.productoEditado = { ...this.productoVender() };
    this.imagePreviews = [];

    // Si el producto tiene imagen, muéstrala como preview
    if (this.productoVender().imagenUrl) {
      this.imagePreviews.push(this.productoVender().imagenUrl);
    }
    this.selectedFiles = [];
  }

  /*
  eliminarProducto() {
    this.productoService.eliminarProducto(this.productoVender().id).subscribe({
      next: (response) => {
        this.showSuccess = true;
        this.updateProductosEvent.emit(); // Emitir el evento para actualizar el producto en el componente padre
        setTimeout(() => {
          this.showSuccess = false;
        }, 3000); // Oculta el toast tras 3 segundos
      },
      error: (error) => {
        console.error('Error al eliminar el producto:', error);
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 3000); // Oculta el toast tras 3 segundos
      }
    });
  }
  */

}
