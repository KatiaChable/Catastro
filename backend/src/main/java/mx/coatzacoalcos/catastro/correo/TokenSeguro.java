package mx.coatzacoalcos.catastro.correo;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.HexFormat;

/**
 * Tokens de un solo uso para los enlaces del correo (verificar cuenta, recuperar contraseña).
 *
 * Regla: el token en claro SOLO viaja en el enlace del correo. En la base de datos se guarda
 * su hash (SHA-256), así quien lea la tabla no puede usar los enlaces (RF-AUT-05).
 */
public final class TokenSeguro {

    private static final SecureRandom RANDOM = new SecureRandom();

    private TokenSeguro() {}

    /** 32 bytes aleatorios en Base64 URL-safe (43 caracteres, sirve tal cual en una URL). */
    public static String generar() {
        byte[] bytes = new byte[32];
        RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    /** Hash hexadecimal que es lo que se guarda y lo que se busca al validar el enlace. */
    public static String hash(String token) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            return HexFormat.of().formatHex(md.digest(token.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 no disponible", e);
        }
    }
}
