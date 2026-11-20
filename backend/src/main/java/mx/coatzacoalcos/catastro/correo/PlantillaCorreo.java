package mx.coatzacoalcos.catastro.correo;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Carga las plantillas HTML de resources/plantillas/correo/ y reemplaza {{clave}} por su valor.
 * Todos los valores se escapan para que un nombre o motivo escrito por el usuario no inyecte HTML.
 * Es Java puro (sin Spring) para poder probarlo sin levantar la aplicación.
 */
public class PlantillaCorreo {

    private static final Pattern MARCADOR = Pattern.compile("\\{\\{\\s*([a-zA-Z0-9_]+)\\s*}}");
    private static final String CARPETA = "plantillas/correo/";

    private final Map<String, String> cache = new ConcurrentHashMap<>();

    /** Devuelve el HTML de la plantilla con los valores ya insertados. */
    public String render(String nombrePlantilla, Map<String, String> valores) {
        String plantilla = cache.computeIfAbsent(nombrePlantilla, this::leer);
        Matcher m = MARCADOR.matcher(plantilla);
        StringBuilder sb = new StringBuilder();
        while (m.find()) {
            String clave = m.group(1);
            if (!valores.containsKey(clave)) {
                throw new IllegalArgumentException(
                        "Falta el valor '" + clave + "' para la plantilla " + nombrePlantilla);
            }
            m.appendReplacement(sb, Matcher.quoteReplacement(escapar(valores.get(clave))));
        }
        m.appendTail(sb);
        return sb.toString();
    }

    private String leer(String nombre) {
        String ruta = CARPETA + nombre + ".html";
        try (InputStream in = getClass().getClassLoader().getResourceAsStream(ruta)) {
            if (in == null) {
                throw new IllegalArgumentException("No existe la plantilla " + ruta);
            }
            return new String(in.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new IllegalStateException("No se pudo leer " + ruta, e);
        }
    }

    static String escapar(String texto) {
        if (texto == null) return "";
        StringBuilder sb = new StringBuilder(texto.length());
        for (char c : texto.toCharArray()) {
            switch (c) {
                case '&' -> sb.append("&amp;");
                case '<' -> sb.append("&lt;");
                case '>' -> sb.append("&gt;");
                case '"' -> sb.append("&quot;");
                case '\'' -> sb.append("&#39;");
                default -> sb.append(c);
            }
        }
        return sb.toString();
    }
}
