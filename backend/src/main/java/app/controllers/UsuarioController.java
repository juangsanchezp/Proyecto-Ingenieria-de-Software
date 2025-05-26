package app.controllers;

import app.objetos.ListaUsuarios;
import app.objetos.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/apiUsuarios")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {

    ListaUsuarios listaUsuarios = new ListaUsuarios(); // Instancia compartida

    @GetMapping("/getUsuario")
    public ResponseEntity<Usuario> getUsuario(){
        Usuario usu = new Usuario("Jose");
        return ResponseEntity.ok(usu);
    }

    @PostMapping("/agregarUsuario")
    public ResponseEntity<Usuario> agregarUsuario(@RequestBody Usuario usuario) {
        listaUsuarios.agregarUsuario(usuario);
        return ResponseEntity.ok(usuario);
    }

    @DeleteMapping("/eliminarUsuario/{nombreUsuario}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable String nombreUsuario) {
        Usuario usuario = listaUsuarios.buscarUsuario(nombreUsuario);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }
        listaUsuarios.eliminarUsuario(usuario);
        return ResponseEntity.ok().build();
    }
}

