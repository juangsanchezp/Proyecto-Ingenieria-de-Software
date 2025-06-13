package app.objetos;

import java.io.File;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class ListaProductos {
    private LinkedList<Producto> productos;
    private String urlJson="backend/src/main/java/app/archivosjson/productos.json";

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
        producto.setId(generarNuevoId()); // Asignar un nuevo ID al producto
        productos.add(producto);
        ProductosJSON.guardar(productos,urlJson);
    }

    public void eliminarProducto(Producto producto) {
        productos.remove(producto);
        ProductosJSON.guardar(productos,urlJson);
    }

    public void actualizarProducto(Producto productoActualizado) {
        for (int i = 0; i < productos.size(); i++) {
            if (productos.get(i).getId() == productoActualizado.getId()) {
                productos.set(i, productoActualizado);
                ProductosJSON.guardar(productos,urlJson);
                return;
            }
        }
    }
    //Generar un nuevo ID para un producto
    private int generarNuevoId() {
        int maxId = 0;
        for (Producto producto : productos) {
            if (producto.getId() > maxId) {
                maxId = producto.getId();
            }
        }
        return maxId + 1;
    }


    /**
     * Procesa la imagen recibida (guarda en disco y retorna la URL pública)
     * @param imagen MultipartFile recibido del controlador
     * @return URL pública de la imagen, o null si no se pudo guardar
     */
    public String procesarImagen(MultipartFile imagen) {
        if (imagen == null || imagen.isEmpty()) {
            return null;
        }

        String folder = System.getProperty("user.dir") + "/backend/src/main/resources/static/img/";
        File directorio = new File(folder);
        if (!directorio.exists()) {
            directorio.mkdirs();
        }
        String rutaFisica = folder + imagen.getOriginalFilename();
        try {
            imagen.transferTo(new File(rutaFisica));
            return "http://localhost:8081/img/" + imagen.getOriginalFilename();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }


}

