package mx.coatzacoalcos.catastro.correo;

import java.util.Locale;

/**
 * El usuario puede escribir su correo, CURP o RFC (igual que en el login del frontend).
 * Se normaliza para buscarlo: el correo en minúsculas y la CURP/RFC en mayúsculas sin espacios.
 */
public final class Identificador {

    private Identificador() {}

    public static String normalizar(String valor) {
        if (valor == null) return "";
        String limpio = valor.trim();
        return limpio.contains("@")
                ? limpio.toLowerCase(Locale.ROOT)
                : limpio.replaceAll("\\s+", "").toUpperCase(Locale.ROOT);
    }

    public static boolean esCorreo(String normalizado) {
        return normalizado.contains("@");
    }
}
