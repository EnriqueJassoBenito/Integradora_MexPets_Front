package mx.edu.utez.mexprotec.segurity.controller;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.validation.Valid;
import mx.edu.utez.mexprotec.models.users.Users;
import mx.edu.utez.mexprotec.segurity.jwt.JwtProvider;
import mx.edu.utez.mexprotec.services.UserService;
import mx.edu.utez.mexprotec.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin()
public class AuthController {

    // AuthenticationManager es una interfaz que se encarga de la autenticación
    @Autowired
    private AuthenticationManager manager;
    // JwtProvider es una clase que se encarga de generar el token
    @Autowired
    private JwtProvider provider;
    // JavaMailSender es una interfaz que se encarga de enviar correos
    @Autowired
    private JavaMailSender javaMailSender;
    // mailFrom es el correo electrónico desde el que se enviarán los correos
    @Value("${spring.mail.username}")
    private String mailFrom;
    // service es una instancia de UsuarioService para poder acceder a los métodos de la clase
    @Autowired
    UserService service;

    @PostMapping("/login")
    public ResponseEntity<CustomResponse<Object>> login(
            @Valid @RequestBody LoginDto login
    ) {
        try {
            // Se crea un objeto de tipo Authentication que contiene el usuario y la contraseña
            Authentication authentication = manager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            login.getCorreo(), login.getContrasena()
                    )
            );
            // Se establece el contexto de seguridad con el objeto Authentication
            SecurityContextHolder.getContext().setAuthentication(authentication);
            // Se genera el token
            String token = provider.generateToken(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Map<String, Object> data = new HashMap<>();
            data.put("token", token);
            data.put("user", userDetails);
            return new ResponseEntity<>(
                    new CustomResponse<>(data, false, 200, "OK"),
                    HttpStatus.OK
            );
        } catch (AuthenticationException e) {
            return new ResponseEntity<>(
                    new CustomResponse<>(null, true, 400, "No se pudo iniciar sesión"),
                    HttpStatus.OK
            );
        }
    }

    @PostMapping("/reset-password")
    public CambioResponseDto requestPasswordReset(@Valid @RequestBody CambioRequestDto datosRequest) throws MessagingException {
        String host = "http://localhost:5173/auth/changePassword";
        // Obtener el usuario a partir del correo electrónico
        Users user = service.findByEmail(datosRequest.getCorreo());

        // Verificar que el usuario existe
        if (user == null) {
            CambioResponseDto response = new CambioResponseDto();
            response.setMensaje("Ocurrió un error al enviar el correo electrónico.");
            response.setError(true);
            return response;
        } else {
            // Generar un token JWT para restablecer la contraseña
            String token = provider.generatePasswordResetToken(user.getEmail());

            // Crear el correo electrónico
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(user.getEmail());
            helper.setFrom(mailFrom);
            helper.setSubject("Recupera tu contraseña");
            helper.setText("<!DOCTYPE html>\n" +
                    "<html lang=\"en\">\n" +
                    "  <head>\n" +
                    "    <meta charset=\"UTF-8\" />\n" +
                    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n" +
                    "  </head>\n" +
                    "\n" +
                    "  <body style=\"font-family: 'Segoe UI', sans-serif; text-align: center\">\n" +
                    "    <div style=\"width: 100%\">\n" +
                    "      <div style=\"margin-top: 20px; display: flex; justify-content: center\">\n" +
                    "        <div style=\"width: 550px; margin: auto\">\n" +
                    "          <div\n" +
                    "            style=\"\n" +
                    "              border: 2px solid #ccc0c1;\n" +
                    "              border-radius: 0.5rem;\n" +
                    "              overflow: hidden;\n" +
                    "            \"\n" +
                    "          >\n" +
                    "            <img\n" +
                    "              src=\"https://demo.stripocdn.email/content/guids/d0dee27c-b951-4be2-9e65-fe5d431243a4/images/booksg5a3638f0519201633971795.jpg\"\n" +
                    "              style=\"width: 100%\"\n" +
                    "              alt=\"Libro\"\n" +
                    "            />\n" +
                    "            <div style=\"background-color: #b53439; height: 35px\"></div>\n" +
                    "            <div style=\"padding: 15px\">\n" +
                    "              <p style=\"font-weight: bold; font-size: 1.5rem; margin-top: -8px\">\n" +
                    "                Recuperar contraseña\n" +
                    "              </p>\n" +
                    "              <p>\n" +
                    "                Hola " + user.getNameUser() + ", parece que has olvidado tu contraseña. No te\n" +
                    "                preocupes, haz clic <a href='" + host + "/?token=" + token + "' style=\"color: #b53439; font-weight: bold;\">aquí</a> para cambiarla.\n" +
                    "              </p>\n" +
                    "              <p>\n" +
                    "                <small style=\"font-style: italic; color: #6c757d\"\n" +
                    "                  >Este mensaje es automático. No es necesario responder.</small\n" +
                    "                >\n" +
                    "              </p>\n" +
                    "            </div>\n" +
                    "          </div>\n" +
                    "        </div>\n" +
                    "      </div>\n" +
                    "    </div>\n" +
                    "  </body>\n" +
                    "</html>\n", true);
            // Enviar el correo electrónico
            javaMailSender.send(message);

            // Devolver una respuesta indicando que se ha enviado el correo electrónico
            CambioResponseDto response = new CambioResponseDto();
            response.setMensaje("Se ha enviado un correo electrónico a " +
                    user.getEmail() + " con las instrucciones para restablecer tu contraseña.");
            response.setError(false);
            return response;
        }
    }

    @PostMapping("/reset-password/confirm")
    public CambioResponseDto resetPassword(@Valid @RequestBody ResetPasswordDto resetPasswordData) {
        // Obtener los datos del usuario a partir del token
        String user = provider.getEmailFromPasswordResetToken(resetPasswordData.getToken());
        // Verificar que el token sea válido y no haya expirado
        if (user == null) {
            // Devolver una respuesta indicando que el token no es válido
            CambioResponseDto response = new CambioResponseDto();
            response.setMensaje("El token no es válido o ha expirado.");
            response.setError(true);
            return response;
        } else {
            // Actualizar la contraseña del usuario
            Users usuario = service.findByEmail(user);
            usuario.setPassword(resetPasswordData.getPassword());
            CustomResponse<Boolean> result = service.updatePassword(usuario);
            if (!result.getError()) {
                CambioResponseDto response = new CambioResponseDto();
                response.setMensaje("Contraseña actualizada correctamente.");
                response.setError(false);
                return response;

            }else {
                CambioResponseDto response = new CambioResponseDto();
                response.setMensaje("Ocurrió un error al actualizar la contraseña.");
                response.setError(true);
                return response;
            }
        }
    }

}
