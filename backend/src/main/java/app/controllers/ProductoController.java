package app.controllers;

import app.archivosjson.ProductosJSON;
import app.objetos.ListaProductos;
import app.objetos.Producto;
import app.objetos.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.Optional;

//http://127.0.0.1:8081/apiProductos/getProductos si copian esto y lo colocan en el navegador ven si agarra el metodo
@RestController
@RequestMapping("/apiProductos")
public class ProductoController {

    ListaProductos listaProductos=new ListaProductos("backend/src/main/java/app/archivosjson/productos.json");//que cargue el json

    //Obtener Productos
    @GetMapping("/getProductos")
    public LinkedList<Producto> getProductos(){

        return listaProductos.getProductos();

    }

    //Buscar producto por id
    @GetMapping("/getProducto/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable int id){
        Optional<Producto> opt= Optional.ofNullable(listaProductos.buscarProducto(id)); //Ver esto
         if(opt.isEmpty()){
             return ResponseEntity.badRequest().build();
         }

        else{
            return ResponseEntity.ok(opt.get());
        }
    }

    // Crear un nuevo Producto
    @PostMapping("/crearProducto")
    public ResponseEntity<Producto> crearProducto(@RequestBody Producto producto) {
        listaProductos.agregarProducto(producto); // Implementa este método
        Producto nuevoProducto =listaProductos.buscarProducto(producto.getId());
        return ResponseEntity.ok(producto); // Devuelve el usuario creado al parecer es buena practica
    }

}
