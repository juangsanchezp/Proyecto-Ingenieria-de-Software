import { Producto } from "./producto.model";

export interface ProductoCarrito {
    producto:Producto;

    //idProducto: number;
    cantidad: number;
}
