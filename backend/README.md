# Backend · Catastro Coatzacoalcos

API REST en **Spring Boot 4.1 (Java 21)** con **PostgreSQL 17 + PostGIS**.
Por ahora trae el **módulo de correo**: verificación de cuenta, recuperación de contraseña y
notificaciones de trámites.

## Arrancar en local

Necesitas Java 21, Maven y Docker Desktop.

```bash
cd backend
docker compose up -d          # base de datos en el puerto 5432 (crea las tablas de sql/)
mvn spring-boot:run           # API en http://localhost:8080
```

En otra terminal, en la raíz del repo: `npm run dev` (frontend en http://localhost:3000).
Vite ya manda `/api` al 8080 (`vite.config.ts`). Si usas `VITE_API_URL=http://localhost:8080/api`,
también funciona porque el backend permite CORS desde el puerto 3000.

Si Maven marca error en alguna dependencia, genera el proyecto en https://start.spring.io con
**Spring Web, Validation, Spring Data JPA, PostgreSQL Driver y Java Mail Sender**, Java 21, y
copia la carpeta `src/` de aquí encima.

## Probarlo sin cuenta de Gmail (perfil `dev`)

Por defecto el perfil es `dev` y `CORREO_HABILITADO=false`:

- No se envía ningún correo. El correo, **con su enlace**, se escribe en la consola del backend.
- Hay una cuenta demo en memoria (`correo/dev/CuentasDemo.java`): `demo@catastro.local`,
  CURP `PEGJ800101HVZRRN09`.

Prueba rápida:

1. Abre http://localhost:3000/recuperar-contrasena y escribe `demo@catastro.local`.
2. Copia el enlace que aparece en la consola del backend y ábrelo.
3. Cambia la contraseña. Si vuelves a abrir el mismo enlace, debe decir que ya no es válido.

## Endpoints (los que ya llama `src/services/auth.service.ts`)

| Método y ruta | Cuerpo | Respuesta |
|---|---|---|
| `POST /api/auth/recuperar-password` | `{ identifier }` correo, CURP o RFC | 202 `{ message }`, igual exista o no la cuenta |
| `POST /api/auth/reset-password` | `{ token, newPassword }` | 200 `{ message }` |
| `POST /api/auth/verificar-correo` | `{ token }` | 200 `{ message }` |
| `POST /api/auth/verificar-correo/reenviar` | `{ identifier }` | 202 `{ message }`, igual exista o no |

Errores en formato ProblemDetail: `{ title, status, detail, campos: { campo: mensaje } }`.
El frontend los lee con `leerErrorApi()` (`src/services/errores.ts`).

| Enlace del correo | Pantalla | Vence |
|---|---|---|
| Verificar cuenta | `/verificar-correo?token=…` | 24 h |
| Restablecer contraseña | `/restablecer-contrasena?token=…` | 30 min |

## Activar el envío real con Gmail

1. Crear la cuenta del proyecto (por ejemplo `catastro.coatza.demo@gmail.com`).
2. Cuenta de Google → Seguridad → activar **Verificación en dos pasos**.
3. Buscar **Contraseñas de aplicaciones** → crear `catastro-backend` → copiar el código de 16 letras.
4. Definir las variables antes de `mvn spring-boot:run` (copia `.env.example`; **nunca** subas `.env`):
   ```
   CORREO_HABILITADO=true
   CORREO_USUARIO=catastro.coatza.demo@gmail.com
   CORREO_CONTRASENA_APP=xxxxxxxxxxxxxxxx
   ```

## Lo que falta conectar (otros módulos)

- **Usuarios:** cuando exista la tabla `usuario`, implementar `CuentasPuerto` con el repositorio
  real, borrar `correo/dev/CuentasDemo.java` y descomentar la llave foránea en
  `sql/10_token_correo.sql`. Ejemplo:
  ```java
  @Component
  public class CuentasAdaptador implements CuentasPuerto {
      // UsuarioRepository, PasswordEncoder y SesionRepository por constructor
      public Optional<Cuenta> buscarPorIdentificador(String id) {
          return (Identificador.esCorreo(id)
                  ? usuarios.findByCorreoIgnoreCase(id)
                  : usuarios.findByCurpOrRfc(id, id)).map(this::aCuenta);
      }
      // buscarPorId, marcarCorreoVerificado, cambiarContrasena (con encoder), cerrarSesiones...
  }
  ```
- **Registro:** al crear la cuenta, llamar `cuentaCorreoService.emitirVerificacion(usuario.getId())`.
- **Trámites:** al cambiar de estado o rechazar un documento, llamar
  `correoService.enviarCambioEstadoTramite(...)` o `enviarDocumentoRechazado(...)`.
- **Seguridad:** si se agrega Spring Security, dejar `/api/auth/**` como `permitAll()`.

## Reglas de seguridad que ya cumple

- El token en claro solo va en el correo; la base guarda su hash SHA-256.
- Cada enlace sirve una vez, y pedir uno nuevo anula los anteriores.
- "Recuperar" y "reenviar" responden igual exista o no la cuenta (RF-AUT-05).
- Restablecer la contraseña cierra las sesiones abiertas y avisa por correo.
- Las pantallas quitan el token de la barra de direcciones en cuanto lo leen.
- Las plantillas escapan lo que escribe el usuario.

Pruebas: `mvn test`.
