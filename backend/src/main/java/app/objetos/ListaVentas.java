package app.objetos;
import java.util.LinkedList;
public class ListaVentas {
    private LinkedList<Venta> ventas;
    private final String urlJson = "backend/src/main/java/app/archivosjson/ventas.json";

    public ListaVentas() {
        // Carga inicial desde el archivo JSON
        this.ventas = new LinkedList<>();
    }
}
