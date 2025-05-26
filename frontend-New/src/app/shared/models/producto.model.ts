export interface Producto {
  id: number;
  nombreProducto: string;
  categoria: string;
  descripcion: string;
  imagenUrl: string;
  precio: number;

 
  cantidadDisponible: number; // Cantidad disponible del producto
}
