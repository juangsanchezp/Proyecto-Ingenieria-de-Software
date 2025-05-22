import { HttpClient } from '@angular/common/http';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { toast } from 'ngx-sonner';
import { dummyData } from 'src/app/shared/dummy/user.dummy';
import { TableFilterService } from './services/table-filter.service';

// Modelo de usuario (si todavía lo usas para otra sección)
import { User } from './model/user.model';

// Modelo de producto
interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  talla: string;
  precio: number;
  stock: number;
}

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [
    AngularSvgIconModule,
    FormsModule,
  ],
})
export class TableComponent implements OnInit {
  // Usuarios (si aún los usas en otra sección)
  users = signal<User[]>([]);

  // Productos
  productos = signal<Producto[]>([
    { id: 1, nombre: 'Camisa Blanca', categoria: 'Camisa', talla: 'M', precio: 25.99, stock: 12 },
    { id: 2, nombre: 'Pantalón Negro', categoria: 'Pantalón', talla: 'L', precio: 39.99, stock: 7 },
    { id: 3, nombre: 'Vestido Rojo', categoria: 'Vestido', talla: 'S', precio: 45.0, stock: 5 },
  ]);

  // Filtro de búsqueda
  filtro = signal('');
  filteredProductos = computed(() => {
    const valor = this.filtro().toLowerCase();
    return this.productos().filter((p) =>
      p.nombre.toLowerCase().includes(valor) ||
      p.id.toString().includes(valor)
    );
  });

  // Formulario de producto
  nuevoProducto: Omit<Producto, 'id'> = {
    nombre: '',
    categoria: '',
    talla: '',
    precio: 0,
    stock: 0,
  };

  // Modo edición
  modoEdicion = false;
  productoEditandoId: number | null = null;

  constructor(
    private http: HttpClient,
    private filterService: TableFilterService
  ) {}

  ngOnInit(): void {
    // Si aún usas usuarios remotos
    this.http.get<User[]>('https://freetestapi.com/api/v1/users?limit=8').subscribe({
      next: (data) => this.users.set(data),
      error: (error) => {
        this.users.set(dummyData);
        this.handleRequestError(error);
      },
    });
  }

  agregarProducto() {
    if (this.modoEdicion && this.productoEditandoId !== null) {
      // Editar
      this.productos.update((lista) =>
        lista.map((p) =>
          p.id === this.productoEditandoId
            ? { ...p, ...this.nuevoProducto }
            : p
        )
      );
    } else {
      // Crear nuevo
      const nuevo: Producto = {
        id: Date.now(),
        ...this.nuevoProducto,
      };
      this.productos.update((lista) => [...lista, nuevo]);
    }

    this.resetFormulario();
  }

  editarProducto(producto: Producto) {
    this.modoEdicion = true;
    this.productoEditandoId = producto.id;
    this.nuevoProducto = {
      nombre: producto.nombre,
      categoria: producto.categoria,
      talla: producto.talla,
      precio: producto.precio,
      stock: producto.stock,
    };
  }

  eliminarProducto(id: number) {
    this.productos.update((lista) => lista.filter((p) => p.id !== id));
    if (this.productoEditandoId === id) {
      this.resetFormulario();
    }
  }

  resetFormulario() {
    this.nuevoProducto = {
      nombre: '',
      categoria: '',
      talla: '',
      precio: 0,
      stock: 0,
    };
    this.modoEdicion = false;
    this.productoEditandoId = null;
    this.imagenSeleccionada = null;
    this.imagenPreview = null;

  }

  private handleRequestError(error: any) {
    const msg = 'Ocurrió un error al cargar usuarios. Se mostrarán datos de prueba.';
    toast.error(msg, {
      position: 'bottom-right',
      description: error.message,
      action: {
        label: 'OK',
        onClick: () => console.log('Confirmado'),
      },
      actionButtonStyle: 'background-color:#DC2626; color:white;',
    });
  }
  imagenSeleccionada: File | null = null;
  imagenPreview: string | null = null;

  onImagenSeleccionada(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    this.imagenSeleccionada = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imagenPreview = reader.result as string;
    };
    reader.readAsDataURL(this.imagenSeleccionada);
  }
}



}
