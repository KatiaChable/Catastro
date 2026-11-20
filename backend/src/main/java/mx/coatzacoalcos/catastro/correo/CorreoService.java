package mx.coatzacoalcos.catastro.correo;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Todos los correos que manda el sistema, uno por método.
 *
 * Los métodos son @Async: regresan de inmediato y el correo sale en otro hilo, así el usuario
 * no espera a Gmail. Si el envío falla se escribe en el log y NO se cae la petición.
 *
 * Importante: @Async solo funciona si llamas al método desde OTRA clase (por ejemplo desde
 * CuentaService), no desde dentro de esta misma.
 */
@Service
public class CorreoService {

    private static final Logger log = LoggerFactory.getLogger(CorreoService.class);
    private static final DateTimeFormatter FECHA =
            DateTimeFormatter.ofPattern("d 'de' MMMM 'de' yyyy", Locale.forLanguageTag("es-MX"));

    private final JavaMailSender mailSender;
    private final PlantillaCorreo plantilla;
    private final CorreoProperties props;

    public CorreoService(JavaMailSender mailSender, PlantillaCorreo plantilla, CorreoProperties props) {
        this.mailSender = mailSender;
        this.plantilla = plantilla;
        this.props = props;
    }

    // ---------- Cuentas (RF-AUT-02 y RF-AUT-05) ----------

    /** Enlace para verificar la cuenta. Vence en 24 h; el token en claro solo va aquí. */
    @Async
    public void enviarVerificacionCuenta(String correo, String nombre, String token) {
        enviar(correo, "Verifica tu cuenta", "verificacion", Map.of(
                "nombre", nombre,
                "enlace", enlace("/verificar-correo", token)));
    }

    /** Enlace para restablecer la contraseña. Vence en 30 min. */
    @Async
    public void enviarRecuperacion(String correo, String nombre, String token) {
        enviar(correo, "Restablece tu contraseña", "recuperacion", Map.of(
                "nombre", nombre,
                "enlace", enlace("/restablecer-contrasena", token)));
    }

    /** Aviso después de cambiar la contraseña (RF-AUT-05). */
    @Async
    public void enviarAvisoCambioContrasena(String correo, String nombre) {
        enviar(correo, "Tu contraseña cambió", "aviso-contrasena", Map.of(
                "nombre", nombre,
                "fecha", FECHA.format(LocalDate.now())));
    }

    // ---------- Notificaciones de trámites (RF-SEG-03) ----------

    @Async
    public void enviarCambioEstadoTramite(String correo, String nombre, String folio, String estado) {
        enviar(correo, "Tu trámite " + folio + " cambió de estado", "estado-tramite", Map.of(
                "nombre", nombre,
                "folio", folio,
                "estado", estado,
                "enlace", props.urlWeb() + "/tramites/" + codificar(folio)));
    }

    @Async
    public void enviarDocumentoRechazado(String correo, String nombre, String folio,
                                         String documento, String motivo) {
        enviar(correo, "Un documento de tu trámite " + folio + " fue rechazado", "documento-rechazado", Map.of(
                "nombre", nombre,
                "folio", folio,
                "documento", documento,
                "motivo", motivo,
                "enlace", props.urlWeb() + "/tramites/" + codificar(folio)));
    }

    @Async
    public void enviarVencimientoProximo(String correo, String nombre, String documento,
                                         String folio, LocalDate vence) {
        enviar(correo, "Tu " + documento + " está por vencer", "vencimiento", Map.of(
                "nombre", nombre,
                "documento", documento,
                "folio", folio,
                "fecha", FECHA.format(vence)));
    }

    // ---------- Envío ----------

    private void enviar(String para, String asunto, String nombrePlantilla, Map<String, String> valores) {
        String html = plantilla.render(nombrePlantilla, valores);
        if (!props.habilitado()) {
            log.info("[correo deshabilitado] Para: {} | Asunto: {} | Valores: {}", para, asunto, valores);
            return;
        }
        try {
            MimeMessage mensaje = mailSender.createMimeMessage();
            MimeMessageHelper h = new MimeMessageHelper(mensaje, false, StandardCharsets.UTF_8.name());
            h.setFrom(props.remitente(), props.nombre());
            h.setTo(para);
            h.setSubject(asunto);
            h.setText(html, true);
            mailSender.send(mensaje);
            log.info("Correo '{}' enviado a {}", nombrePlantilla, para);
        } catch (MessagingException | MailException | UnsupportedEncodingException e) {
            // No se relanza: un correo que falla no debe tumbar el registro ni el trámite.
            log.error("No se pudo enviar el correo '{}' a {}: {}", nombrePlantilla, para, e.getMessage());
        }
    }

    private String enlace(String ruta, String token) {
        return props.urlWeb() + ruta + "?token=" + codificar(token);
    }

    private static String codificar(String valor) {
        return URLEncoder.encode(valor, StandardCharsets.UTF_8);
    }
}
