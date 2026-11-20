package mx.coatzacoalcos.catastro.correo;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Endpoints de correo que ya llama el frontend (src/services/auth.service.ts).
 * Respuesta correcta: { "message": "..." }.
 * Error: ProblemDetail (RFC 9457) { "title", "status", "detail", "campos": { campo: mensaje } }.
 * Son públicos: si se agrega Spring Security, poner permitAll() a /api/auth/**.
 */
@RestController
@RequestMapping("/api/auth")
public class CuentaCorreoController {

    static final String MENSAJE_RECUPERAR =
            "Si la cuenta existe, enviamos a su correo registrado un enlace para restablecer la contraseña. Vence en 30 minutos.";
    static final String MENSAJE_REENVIAR =
            "Si la cuenta existe y no está verificada, enviamos a su correo registrado un enlace nuevo. Vence en 24 horas.";

    public record TokenRequest(@NotBlank(message = "Falta el token del enlace") String token) {}

    public record IdentificadorRequest(
            @NotBlank(message = "Escribe tu correo, CURP o RFC")
            @Size(max = 254, message = "El dato es demasiado largo")
            String identifier) {}

    /** El frontend también manda "codigoCelular"; se ignora porque el SMS se quitó del alcance. */
    public record ResetPasswordRequest(
            @NotBlank(message = "Falta el token del enlace") String token,
            @NotBlank(message = "Escribe tu nueva contraseña")
            @Size(min = 12, max = 128, message = "La contraseña debe tener entre 12 y 128 caracteres (RF-AUT-01)")
            String newPassword) {}

    public record Mensaje(String message) {}

    private final CuentaCorreoService servicio;

    public CuentaCorreoController(CuentaCorreoService servicio) {
        this.servicio = servicio;
    }

    @PostMapping("/verificar-correo")
    public Mensaje verificarCorreo(@Valid @RequestBody TokenRequest req) {
        servicio.verificarCorreo(req.token());
        return new Mensaje("Tu correo quedó verificado. Ya puedes iniciar sesión.");
    }

    @PostMapping("/verificar-correo/reenviar")
    public ResponseEntity<Mensaje> reenviarVerificacion(@Valid @RequestBody IdentificadorRequest req) {
        servicio.reenviarVerificacion(req.identifier());
        return ResponseEntity.accepted().body(new Mensaje(MENSAJE_REENVIAR));
    }

    @PostMapping("/recuperar-password")
    public ResponseEntity<Mensaje> recuperarPassword(@Valid @RequestBody IdentificadorRequest req) {
        servicio.solicitarRecuperacion(req.identifier());
        return ResponseEntity.accepted().body(new Mensaje(MENSAJE_RECUPERAR));
    }

    @PostMapping("/reset-password")
    public Mensaje resetPassword(@Valid @RequestBody ResetPasswordRequest req) {
        servicio.restablecer(req.token(), req.newPassword());
        return new Mensaje("Tu contraseña se actualizó y cerramos tus sesiones abiertas.");
    }

    @ExceptionHandler(EnlaceInvalidoException.class)
    public ProblemDetail enlaceInvalido(EnlaceInvalidoException e) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
        pd.setTitle("Enlace no válido");
        return pd;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail datosInvalidos(MethodArgumentNotValidException e) {
        Map<String, String> campos = new LinkedHashMap<>();
        e.getBindingResult().getFieldErrors()
                .forEach(fe -> campos.putIfAbsent(fe.getField(), fe.getDefaultMessage()));
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Revisa los datos del formulario.");
        pd.setTitle("Datos no válidos");
        pd.setProperty("campos", campos);
        return pd;
    }
}
