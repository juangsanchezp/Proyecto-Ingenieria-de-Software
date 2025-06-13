package app.controllers;

import app.objetos.ListaUsuarios;
import app.objetos.Usuario;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/apiUsuarios")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {

    private ListaUsuarios listaUsuarios = new ListaUsuarios(); // Instancia compartida



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

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Usuario userLogin) {

        if(listaUsuarios.existeUsuario(userLogin.getNombreUsuario(), userLogin.getContrasena())){
            return ResponseEntity.ok(userLogin); // Login válido
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();// Login inválido

    }

    @PostMapping("/registrarUsuario")
    public ResponseEntity<String> registrar(@RequestBody Usuario nuevoUsuario) {

        // Verificar si el usuario ya existe
        if (listaUsuarios.agregarUsuario(nuevoUsuario)) {
            return ResponseEntity.ok("Usuario registrado con éxito.");
        }
        // Si el usuario ya existe, devolver un error
        return ResponseEntity.status(HttpStatus.CONFLICT).body("El usuario ya existe.");


    }

}

