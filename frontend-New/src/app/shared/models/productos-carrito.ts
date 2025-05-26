import { Producto } from "./producto.model";

export interface ProductosCarrito {
    productosCarrito:Producto[];
    total: number;
}
