-- Enlaces de un solo uso que salen por correo (verificar cuenta y recuperar contraseña).
-- PROPUESTA para quienes llevan la base de datos (Katia y César).

CREATE TABLE IF NOT EXISTS token_correo (
    token_id      BIGSERIAL    PRIMARY KEY,
    usuario_id    BIGINT       NOT NULL,
    tipo          VARCHAR(20)  NOT NULL CHECK (tipo IN ('VERIFICACION', 'RECUPERACION')),
    token_hash    CHAR(64)     NOT NULL UNIQUE,      -- SHA-256 en hexadecimal, nunca el token en claro
    expira_en     TIMESTAMPTZ  NOT NULL,             -- verificación: +24 h, recuperación: +30 min
    usado_en      TIMESTAMPTZ,                       -- NULL mientras no se usa; un solo uso
    creado_en     TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CHECK (expira_en > creado_en)
);

CREATE INDEX IF NOT EXISTS idx_token_correo_pendientes
    ON token_correo (usuario_id, tipo)
    WHERE usado_en IS NULL;

-- Cuando exista la tabla de usuarios, agregar la llave foránea (ajustar nombres):
--   ALTER TABLE token_correo
--     ADD CONSTRAINT fk_token_correo_usuario
--     FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id) ON DELETE CASCADE;
--
-- Y la columna para saber si ya verificó su correo:
--   ALTER TABLE usuario ADD COLUMN correo_verificado BOOLEAN NOT NULL DEFAULT false;
