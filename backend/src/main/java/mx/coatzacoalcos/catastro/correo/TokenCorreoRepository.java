package mx.coatzacoalcos.catastro.correo;

import java.time.OffsetDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TokenCorreoRepository extends JpaRepository<TokenCorreo, Long> {

    Optional<TokenCorreo> findByTokenHashAndTipo(String tokenHash, TipoToken tipo);

    /**
     * Marca el token como usado SOLO si sigue vigente y sin usar. Devuelve 1 si lo consumió y 0 si no.
     * Al hacerlo en un solo UPDATE, dos clics al mismo enlace no lo pueden usar dos veces.
     */
    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("""
            update TokenCorreo t set t.usadoEn = :ahora
            where t.id = :id and t.usadoEn is null and t.expiraEn > :ahora
            """)
    int consumir(@Param("id") Long id, @Param("ahora") OffsetDateTime ahora);

    /** Anula los enlaces pendientes del usuario: al pedir uno nuevo, los anteriores dejan de servir. */
    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("""
            update TokenCorreo t set t.usadoEn = :ahora
            where t.usuarioId = :usuarioId and t.tipo = :tipo and t.usadoEn is null
            """)
    int anularPendientes(@Param("usuarioId") Long usuarioId,
                         @Param("tipo") TipoToken tipo,
                         @Param("ahora") OffsetDateTime ahora);
}
