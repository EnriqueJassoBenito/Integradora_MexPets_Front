package mx.edu.utez.mexprotec.segurity.service;


import mx.edu.utez.mexprotec.models.users.Users;
import mx.edu.utez.mexprotec.segurity.model.AuthUser;
import mx.edu.utez.mexprotec.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService implements UserDetailsService {
    @Autowired
    UserService service;
    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        Users usuario = this.service.findByEmail(correo);
        return AuthUser.build(usuario);
    }
}
