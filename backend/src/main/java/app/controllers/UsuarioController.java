package app.controllers;

import app.objetos.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//http://127.0.0.1:8080/api/getUsuario solo para ver si agarra 

@RestController
@RequestMapping("/apiUsuarios") //nombredel api en general
@CrossOrigin(origins = "http://localhost:4200") // Permite Angular local

public class UsuarioController {
    @GetMapping("/getUsuario")
    public ResponseEntity<Usuario> getUsuario(){
        //return new Usuario("Pepito");
        Usuario usu =new Usuario("Jose");
        return ResponseEntity.ok(usu);
    }
}
