package app.objetos;

import java.util.LinkedList;

public class ListaUsuarios {
    private LinkedList<Usuario>usuarios;

    public ListaUsuarios() {
        usuarios=new LinkedList<>();
    }

    public LinkedList<Usuario> getUsuarios(){
        return usuarios;
    }
    public Usuario buscarUsuario(String nombreUsuario){
        Usuario usuBuscado=null;
        for (Usuario usu: usuarios){
            if (usu.getNombreUsuario()==nombreUsuario){
                usuBuscado=usu;
            }
        }
        return usuBuscado;
    }
    public void agregarUsuario(Usuario usuario) {
        usuarios.add(usuario);
    }
    public void eliminarUsuario(Usuario usuario) {
        usuarios.remove(usuario);
    }

}
