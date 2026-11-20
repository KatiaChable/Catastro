package mx.coatzacoalcos.catastro.correo.dev;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import mx.coatzacoalcos.catastro.correo.CuentasPuerto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * SOLO PARA PROBAR mientras no exista la parte de usuarios. Se activa con el perfil "dev".
 * Tiene una cuenta ficticia en memoria. Cuando exista la tabla de usuarios, se borra esta clase
 * y se implementa CuentasPuerto con el repositorio real (ver LEEME-correo.md).
 */
@Component
@Profile("dev")
public class CuentasDemo implements CuentasPuerto {

    private static final Logger log = LoggerFactory.getLogger(CuentasDemo.class);

    private final Map<Long, Cuenta> cuentas = new ConcurrentHashMap<>();
    private final Map<Long, String[]> claves = new ConcurrentHashMap<>(); // id -> {curp, rfc}

    public CuentasDemo() {
        cuentas.put(1L, new Cuenta(1L, "demo@catastro.local", "Ciudadano Demo", false));
        claves.put(1L, new String[] {"PEGJ800101HVZRRN09", "PEGJ800101AB1"});
        log.warn("Perfil dev: usando cuentas DEMO en memoria (demo@catastro.local / PEGJ800101HVZRRN09)");
    }

    @Override
    public Optional<Cuenta> buscarPorIdentificador(String id) {
        return cuentas.values().stream()
                .filter(c -> c.correo().equals(id)
                        || claves.get(c.id())[0].equals(id)
                        || claves.get(c.id())[1].equals(id))
                .findFirst();
    }

    @Override
    public Optional<Cuenta> buscarPorId(Long usuarioId) {
        return Optional.ofNullable(cuentas.get(usuarioId));
    }

    @Override
    public void marcarCorreoVerificado(Long usuarioId) {
        cuentas.computeIfPresent(usuarioId,
                (k, c) -> new Cuenta(c.id(), c.correo(), c.nombre(), true));
        log.info("[demo] Cuenta {} verificada", usuarioId);
    }

    @Override
    public void cambiarContrasena(Long usuarioId, String nuevaContrasena) {
        log.info("[demo] Contraseña de la cuenta {} cambiada (no se guarda en modo demo)", usuarioId);
    }

    @Override
    public void cerrarSesiones(Long usuarioId) {
        log.info("[demo] Sesiones de la cuenta {} cerradas", usuarioId);
    }
}
