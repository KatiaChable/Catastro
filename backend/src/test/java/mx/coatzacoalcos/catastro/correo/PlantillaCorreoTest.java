package mx.coatzacoalcos.catastro.correo;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Map;
import org.junit.jupiter.api.Test;

class PlantillaCorreoTest {

    private final PlantillaCorreo plantilla = new PlantillaCorreo();

    @Test
    void escapaLoQueEscribeElUsuario() {
        String html = plantilla.render("documento-rechazado", Map.of(
                "nombre", "Ana <script>",
                "folio", "CED-2026-0001",
                "documento", "INE",
                "motivo", "Vencida & ilegible",
                "enlace", "http://localhost:5173/tramites/CED-2026-0001"));
        assertTrue(html.contains("Ana &lt;script&gt;"));
        assertTrue(html.contains("Vencida &amp; ilegible"));
        assertFalse(html.contains("{{"));
    }

    @Test
    void fallaSiFaltaUnValor() {
        var e = assertThrows(IllegalArgumentException.class,
                () -> plantilla.render("verificacion", Map.of("nombre", "Ana")));
        assertTrue(e.getMessage().contains("enlace"));
    }

    @Test
    void tokenSeguroParaUrlYHashEstable() {
        String token = TokenSeguro.generar();
        assertEquals(43, token.length());
        assertTrue(token.matches("[A-Za-z0-9_-]+"));
        assertNotEquals(token, TokenSeguro.generar());
        assertEquals(64, TokenSeguro.hash(token).length());
        assertEquals(TokenSeguro.hash(token), TokenSeguro.hash(token));
    }

    @Test
    void normalizaCorreoCurpYRfc() {
        assertEquals("ana@correo.com", Identificador.normalizar("  Ana@Correo.COM "));
        assertEquals("PEGJ800101HVZRRN09", Identificador.normalizar(" pegj800101hvzrrn09 "));
        assertEquals("PEGJ800101AB1", Identificador.normalizar("pegj 800101 ab1"));
        assertTrue(Identificador.esCorreo(Identificador.normalizar("ana@correo.com")));
        assertFalse(Identificador.esCorreo(Identificador.normalizar("PEGJ800101AB1")));
    }
}
