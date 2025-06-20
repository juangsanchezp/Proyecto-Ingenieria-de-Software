import { Producto } from "./producto.model";

export interface ProductoCarrito {
    producto:Producto;

    cantidad: number;
}
