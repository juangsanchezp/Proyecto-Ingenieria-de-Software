package app.controllers;

import app.objetos.ListaProductos;
import app.objetos.Producto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/apiProductos")
public class ProductoController {

    ListaProductos listaProductos = new ListaProductos("backend/src/main/java/app/archivosjson/productos.json");

    // Obtener todos los productos
    @GetMapping("/getProductos")
    public LinkedList<Producto> getProductos() {
        return listaProductos.getProductos();
    }

    // Obtener un producto por su ID
    @GetMapping("/getProducto/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable int id) {
        Optional<Producto> opt = Optional.ofNullable(listaProductos.buscarProducto(id));
        if (opt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(opt.get());
        }
    }

    // Agregar un nuevo producto
    @PostMapping("/crearProducto")
    public ResponseEntity<Producto> crearProducto(@RequestBody Producto producto) {
        listaProductos.agregarProducto(producto);
        Producto nuevoProducto = listaProductos.buscarProducto(producto.getId());
        return ResponseEntity.ok(nuevoProducto);
    }

    // Eliminar un producto por su ID
    @DeleteMapping("/eliminarProducto/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable int id) {
        Producto producto = listaProductos.buscarProducto(id);
        if (producto == null) {
            return ResponseEntity.notFound().build();
        }
        listaProductos.eliminarProducto(producto);
        return ResponseEntity.ok().build();
    }
}

