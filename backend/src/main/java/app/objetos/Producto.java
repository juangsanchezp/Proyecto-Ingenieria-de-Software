package app.objetos;

public class Producto {
    private int id;
    private String nombreProducto;
    private String categoria;
    private String descripcion;
    private String imagenUrl;
    private float precio;

    public Producto(int id, String nombreProducto, String categoria, String descripcion, String imagenUrl, float precio) {
        this.id = id;
        this.nombreProducto = nombreProducto;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.imagenUrl = imagenUrl;
        this.precio = precio;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public float getPrecio() {
        return precio;
    }

    public void setPrecio(float precio) {
        this.precio = precio;
    }
}
