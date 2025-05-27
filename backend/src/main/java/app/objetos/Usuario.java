package app.objetos;

public class Usuario {
    private String correo;
    private String nombreUsuario;
    private String nombre;
    private String apellido;
    private String contrasena;
    private ListaProductos carritoProductos;

    public Usuario() {}

    public Usuario(String correo, String nombreUsuario, String nombre, String apellido, String contrasena) {
        this.correo = correo;
        this.nombreUsuario = nombreUsuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.contrasena = contrasena;
    }

    public Usuario(String nombre) {
        this.nombre = nombre;
    }

    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public ListaProductos getCarritoProductos() {
        return carritoProductos;
    }

    public void setCarritoProductos(ListaProductos carritoProductos) {
        this.carritoProductos = carritoProductos;
    }
}
