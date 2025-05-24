package app.objetos;

import java.util.LinkedList;

public class ListaProductos {
    private LinkedList<Producto> productos;

    public ListaProductos() {
        this.productos = new LinkedList<>();
    }
    public LinkedList<Producto> getProductos(){
        return productos;
    }
    public Producto buscarProducto(int idProducto){
        Producto producBuscado=null;
        for (Producto producto: productos){
            if (producto.getId()==idProducto){
                producBuscado=producto;
            }
        }
        return producBuscado;
    }
    public void agregarUsuario(Producto usuario) {
        productos.add(usuario);
    }
    public void eliminarUsuario(Producto usuario) {
        productos.remove(usuario);
    }
}
