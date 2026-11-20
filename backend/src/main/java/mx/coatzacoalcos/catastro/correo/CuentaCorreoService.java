package mx.coatzacoalcos.catastro.correo;

import java.time.OffsetDateTime;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Flujos de cuenta que pasan por correo: verificar la cuenta y recuperar la contraseña.
 * El token en claro solo existe dentro del correo; en la base se guarda su hash.
 */
@Service
public class CuentaCorreoService {

    private final TokenCorreoRepository tokens;
    private final CuentasPuerto cuentas;
    private final CorreoService correo;

    public CuentaCorreoService(TokenCorreoRepository tokens, CuentasPuerto cuentas, CorreoService correo) {
        this.tokens = tokens;
        this.cuentas = cuentas;
        this.correo = correo;
    }

    /** Llamar justo después de crear la cuenta (RF-AUT-02). */
    @Transactional
    public void emitirVerificacion(Long usuarioId) {
        cuentas.buscarPorId(usuarioId)
                .filter(c -> !c.correoVerificado())
                .ifPresent(c -> correo.enviarVerificacionCuenta(c.correo(), c.nombre(),
                        crearToken(c.id(), TipoToken.VERIFICACION)));
    }

    /** Reenvía el enlace. No dice si el correo existe (evita adivinar cuentas). */
    @Transactional
    public void reenviarVerificacion(String identificador) {
        cuentas.buscarPorIdentificador(Identificador.normalizar(identificador))
                .filter(c -> !c.correoVerificado())
                .ifPresent(c -> correo.enviarVerificacionCuenta(c.correo(), c.nombre(),
                        crearToken(c.id(), TipoToken.VERIFICACION)));
    }

    @Transactional
    public void verificarCorreo(String token) {
        cuentas.marcarCorreoVerificado(consumir(token, TipoToken.VERIFICACION));
    }

    /** RF-AUT-05: la respuesta al usuario es la misma exista o no la cuenta. */
    @Transactional
    public void solicitarRecuperacion(String identificador) {
        cuentas.buscarPorIdentificador(Identificador.normalizar(identificador))
                .ifPresent(c -> correo.enviarRecuperacion(c.correo(), c.nombre(),
                        crearToken(c.id(), TipoToken.RECUPERACION)));
    }

    @Transactional
    public void restablecer(String token, String nuevaContrasena) {
        Long usuarioId = consumir(token, TipoToken.RECUPERACION);
        cuentas.cambiarContrasena(usuarioId, nuevaContrasena);
        cuentas.cerrarSesiones(usuarioId);
        cuentas.buscarPorId(usuarioId)
                .ifPresent(c -> correo.enviarAvisoCambioContrasena(c.correo(), c.nombre()));
    }

    // ---------- Internos ----------

    private String crearToken(Long usuarioId, TipoToken tipo) {
        OffsetDateTime ahora = OffsetDateTime.now();
        tokens.anularPendientes(usuarioId, tipo, ahora);
        String token = TokenSeguro.generar();
        tokens.save(new TokenCorreo(usuarioId, tipo, TokenSeguro.hash(token), ahora));
        return token;
    }

    private Long consumir(String token, TipoToken tipo) {
        if (token == null || token.isBlank()) {
            throw new EnlaceInvalidoException();
        }
        TokenCorreo fila = tokens.findByTokenHashAndTipo(TokenSeguro.hash(token.trim()), tipo)
                .orElseThrow(EnlaceInvalidoException::new);
        if (tokens.consumir(fila.getId(), OffsetDateTime.now()) == 0) {
            throw new EnlaceInvalidoException();
        }
        return fila.getUsuarioId();
    }
}
