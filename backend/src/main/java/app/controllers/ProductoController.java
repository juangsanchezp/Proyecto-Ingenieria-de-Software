package app.controllers;

import app.objetos.ListaProductos;
import app.objetos.Producto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.LinkedList;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/apiProductos")
public class ProductoController {

    private ListaProductos listaProductos = new ListaProductos("backend/src/main/java/app/archivosjson/productos.json");

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

    // Agregar un nuevo producto con imagen

    @PostMapping(value = "/crearProducto", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Producto> crearProducto(
            @RequestPart("producto") String productoJson,
            @RequestPart(value = "imagen", required = false) MultipartFile imagen
    ) throws IOException {
        // Deserializa el JSON a un objeto Producto
        ObjectMapper mapper = new ObjectMapper();
        Producto producto = mapper.readValue(productoJson, Producto.class);

        // Procesa la imagen usando el método de ListaProductos
        String urlImagen = listaProductos.procesarImagen(imagen);
        producto.setImagenUrl(urlImagen);

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

    // Actualizar un producto por su ID con imagen
    @PutMapping(value = "/actualizarProducto/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Producto> actualizarProducto(
            @PathVariable int id,
            @RequestParam("nombreProducto") String nombreProducto,
            @RequestParam("categoria") String categoria,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("precio") float precio,
            @RequestParam("cantidadDisponible") int cantidadDisponible,
            @RequestParam("proveedorUsuario") String proveedorUsuario,
            @RequestPart(value = "imagen", required = false) MultipartFile imagen
    ) {
        Producto productoExistente = listaProductos.buscarProducto(id);

        if (productoExistente == null) {
            return ResponseEntity.notFound().build();
        }

        // Actualiza los campos
        productoExistente.setNombreProducto(nombreProducto);
        productoExistente.setCategoria(categoria);
        productoExistente.setDescripcion(descripcion);
        productoExistente.setPrecio(precio);
        productoExistente.setCantidadDisponible(cantidadDisponible);
        productoExistente.setProveedorUsuario(proveedorUsuario);

        // Procesa la imagen usando el método de ListaProductos (solo si se envía una nueva)
        if (imagen != null && !imagen.isEmpty()) {
            String urlImagen = listaProductos.procesarImagen(imagen);
            productoExistente.setImagenUrl(urlImagen);
        }

        listaProductos.actualizarProducto(productoExistente);

        return ResponseEntity.ok(productoExistente);
    }



}