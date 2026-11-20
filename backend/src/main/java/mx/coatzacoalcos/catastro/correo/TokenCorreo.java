package mx.coatzacoalcos.catastro.correo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.OffsetDateTime;

/** Fila de la tabla token_correo (ver token_correo.sql). Guarda el HASH del token, nunca el token. */
@Entity
@Table(name = "token_correo")
public class TokenCorreo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "token_id")
    private Long id;

    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false, length = 20)
    private TipoToken tipo;

    @Column(name = "token_hash", nullable = false, unique = true, length = 64)
    private String tokenHash;

    @Column(name = "expira_en", nullable = false)
    private OffsetDateTime expiraEn;

    @Column(name = "usado_en")
    private OffsetDateTime usadoEn;

    @Column(name = "creado_en", nullable = false, updatable = false)
    private OffsetDateTime creadoEn;

    protected TokenCorreo() {}

    public TokenCorreo(Long usuarioId, TipoToken tipo, String tokenHash, OffsetDateTime ahora) {
        this.usuarioId = usuarioId;
        this.tipo = tipo;
        this.tokenHash = tokenHash;
        this.creadoEn = ahora;
        this.expiraEn = ahora.plus(tipo.vigencia());
    }

    public Long getId() { return id; }
    public Long getUsuarioId() { return usuarioId; }
    public TipoToken getTipo() { return tipo; }
    public OffsetDateTime getExpiraEn() { return expiraEn; }
    public OffsetDateTime getUsadoEn() { return usadoEn; }
}
