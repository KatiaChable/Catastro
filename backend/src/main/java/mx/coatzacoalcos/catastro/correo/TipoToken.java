package mx.coatzacoalcos.catastro.correo;

import java.time.Duration;

/** Tipos de enlace que salen por correo y cuánto dura cada uno. */
public enum TipoToken {
    /** RF-AUT-02: el enlace para verificar la cuenta vence en 24 h. */
    VERIFICACION(Duration.ofHours(24)),
    /** RF-AUT-05: el enlace para restablecer la contraseña vence en 30 min. */
    RECUPERACION(Duration.ofMinutes(30));

    private final Duration vigencia;

    TipoToken(Duration vigencia) {
        this.vigencia = vigencia;
    }

    public Duration vigencia() {
        return vigencia;
    }
}
