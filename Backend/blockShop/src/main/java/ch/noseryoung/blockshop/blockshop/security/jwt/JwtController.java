package ch.noseryoung.blockshop.blockshop.security.jwt;

import ch.noseryoung.blockshop.blockshop.security.role.RoleRepository;
import ch.noseryoung.blockshop.blockshop.security.user.User;
import ch.noseryoung.blockshop.blockshop.security.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class JwtController {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthRequest request) {
        return jwtService.authenticateUserWithJWT(request);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid AuthRequest request) {
        userRepository.save(new User(request.getName(), request.getPassword(), roleRepository.getByName("user")));
        return jwtService.authenticateUserWithJWT(request);
    }
}
