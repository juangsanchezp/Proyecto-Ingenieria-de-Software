package app.objetos;

import app.archivosjson.UsuariosJSON;

import java.util.LinkedList;
import java.util.List;

public class ListaUsuarios {
    private LinkedList<Usuario> usuarios;
    private final String urlJson = "backend/src/main/java/app/archivosjson/usuarios.json";

    public ListaUsuarios() {
        // Carga inicial desde el archivo JSON
        List<Usuario> cargados = UsuariosJSON.cargar(urlJson);
        this.usuarios = new LinkedList<>(cargados);
    }

    public LinkedList<Usuario> getUsuarios() {
        return usuarios;
    }

    public Usuario buscarUsuario(String nombreUsuario) {
        for (Usuario usu : usuarios) {
            if (usu.getNombreUsuario().equals(nombreUsuario)) {
                return usu;
            }
        }
        return null;
    }

    public void agregarUsuario(Usuario usuario) {
        usuarios.add(usuario);
        UsuariosJSON.guardar(usuarios, urlJson); // Guardar al archivo
    }

    public void eliminarUsuario(Usuario usuario) {
        usuarios.remove(usuario);
        UsuariosJSON.guardar(usuarios, urlJson); // Guardar al archivo
    }
}
