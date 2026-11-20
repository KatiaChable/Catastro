package mx.coatzacoalcos.catastro.correo;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Datos del remitente y de la web, leídos de application.properties (prefijo "catastro.correo").
 *
 * @param remitente  dirección que envía, la misma cuenta de Gmail del proyecto
 * @param nombre     nombre visible del remitente
 * @param urlWeb     dirección del frontend; los enlaces del correo apuntan ahí
 * @param habilitado si es false no se envía nada y solo se escribe en el log (útil en local)
 */
@ConfigurationProperties(prefix = "catastro.correo")
public record CorreoProperties(String remitente, String nombre, String urlWeb, boolean habilitado) {}
