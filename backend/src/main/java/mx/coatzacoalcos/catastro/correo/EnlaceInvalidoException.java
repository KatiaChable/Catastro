package mx.coatzacoalcos.catastro.correo;

/** El enlace no existe, ya se usó o venció. El mensaje es el mismo en los tres casos a propósito. */
public class EnlaceInvalidoException extends RuntimeException {
    public EnlaceInvalidoException() {
        super("El enlace no es válido, ya se usó o venció. Solicita uno nuevo.");
    }
}
