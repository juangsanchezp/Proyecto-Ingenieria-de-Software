package app.controllers;

import app.objetos.ListaProductos;
import app.objetos.Producto;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import app.objetos.CarritoJSON;

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

    @PostMapping("/guardarCarritoPorArchivo")
    public ResponseEntity<String> guardarCarrito(@RequestBody Map<String, Object> payload) {
        ObjectMapper mapper = new ObjectMapper();

        try {
            String usuario = (String) payload.get("usuario");
            List<Producto> carrito = mapper.convertValue(payload.get("carrito"), new TypeReference<>() {});
            CarritoJSON.guardarCarrito(usuario, carrito);
            return ResponseEntity.ok("Archivo de carrito guardado como carrito-" + usuario + ".json");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al guardar archivo de carrito");
        }
    }

}

