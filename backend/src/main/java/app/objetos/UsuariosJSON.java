package app.objetos;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.io.File;
import java.io.IOException;
import java.util.List;

public class UsuariosJSON {

    private static final ObjectMapper mapper = new ObjectMapper()
            .enable(SerializationFeature.INDENT_OUTPUT);

    public static void guardar(List<Usuario> usuarios, String archivo) {
        try {
            mapper.writeValue(new File(archivo), usuarios);
        } catch (IOException e) {
            System.err.println("Error guardando usuarios: " + e.getMessage());
        }
    }

    public static List<Usuario> cargar(String archivo) {
        try {
            return mapper.readValue(new File(archivo),
                    mapper.getTypeFactory().constructCollectionType(List.class, Usuario.class));
        } catch (IOException e) {
            System.err.println("Error cargando usuarios: " + e.getMessage());
            return List.of();
        }
    }
}