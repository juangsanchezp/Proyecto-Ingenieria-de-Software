package app.objetos;

import app.archivosjson.ProductosJSON;
import java.util.LinkedList;
import java.util.List;

public class ListaProductos {
    private LinkedList<Producto> productos;

    // Constructor por defecto: lista vacía
    public ListaProductos() {
        this.productos = new LinkedList<>();
    }

    // Constructor que carga productos desde un archivo JSON
    public ListaProductos(String archivoJSON) {
        List<Producto> cargados = ProductosJSON.cargar(archivoJSON);
        this.productos = new LinkedList<>(cargados);
    }

    public LinkedList<Producto> getProductos() {
        return productos;
    }

    public Producto buscarProducto(int idProducto) {
        for (Producto producto : productos) {
            if (producto.getId() == idProducto) {
                return producto;
            }
        }
        return null;
    }

    public void agregarProducto(Producto producto) {
        productos.add(producto);
        //ProductosJSON.guardar(,producto);
    }

    public void eliminarProducto(Producto producto) {
        productos.remove(producto);
    }
}

