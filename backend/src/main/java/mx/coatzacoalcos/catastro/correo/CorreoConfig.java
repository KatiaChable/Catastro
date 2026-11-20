package mx.coatzacoalcos.catastro.correo;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

/** Activa el envío en segundo plano (@Async) y registra la plantilla como bean. */
@Configuration
@EnableAsync
@EnableConfigurationProperties(CorreoProperties.class)
public class CorreoConfig {

    @Bean
    public PlantillaCorreo plantillaCorreo() {
        return new PlantillaCorreo();
    }
}
