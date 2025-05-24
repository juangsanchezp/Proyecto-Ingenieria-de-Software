package app.controllers;

import app.objetos.ListaProductos;
import app.objetos.Producto;
import app.objetos.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.Optional;

@RestController
@RequestMapping("/apiProductos")
public class ProductoController {
    ListaProductos listaProductos=new ListaProductos();
    @GetMapping("/getProductos")
    public LinkedList<Producto> getProductos(){
        return listaProductos.getProductos();
    }

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
}
