package app.objetos;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.List;

public class CarritoJSON {

    public static void guardarCarrito(String usuario, List<Producto> carrito) {
        ObjectMapper mapper = new ObjectMapper();
        String nombreArchivo = "carrito-" + usuario + ".json";

        try {
            mapper.writerWithDefaultPrettyPrinter().writeValue(new File(nombreArchivo), carrito);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

