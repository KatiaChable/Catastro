package mx.coatzacoalcos.catastro.correo;

import java.util.Optional;

/**
 * Lo que el módulo de correo necesita de la parte de usuarios. Quien lleve usuarios lo implementa
 * con su repositorio (ver el ejemplo en LEEME.md). Así este módulo no depende de cómo quede la
 * entidad Usuario.
 */
public interface CuentasPuerto {

    /** Datos mínimos de una cuenta para mandarle correos. */
    record Cuenta(Long id, String correo, String nombre, boolean correoVerificado) {}

    /**
     * Busca por correo, CURP o RFC. Recibe el valor ya normalizado con {@link Identificador#normalizar}:
     * si trae "@" es correo (minúsculas); si no, es CURP o RFC (mayúsculas). En persona moral,
     * el RFC es el de la empresa.
     */
    Optional<Cuenta> buscarPorIdentificador(String identificadorNormalizado);

    Optional<Cuenta> buscarPorId(Long usuarioId);

    void marcarCorreoVerificado(Long usuarioId);

    /** Recibe la contraseña en claro; la implementación la guarda con hash (BCrypt o Argon2). */
    void cambiarContrasena(Long usuarioId, String nuevaContrasena);

    /** RF-AUT-05: al restablecer la contraseña se cierran las sesiones abiertas. */
    void cerrarSesiones(Long usuarioId);
}
