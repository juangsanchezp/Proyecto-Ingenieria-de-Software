import {Producto} from './producto.model';

export interface Usuario {
  correo: string;
  nombreUsuario: string;
  nombre: string;
  apellido: string;
  contrasena: string;
  carritoProductos:Producto[];
}
