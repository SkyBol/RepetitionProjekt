package ch.noseryoung.blockshop.blockshop.security.jwt;

import ch.noseryoung.blockshop.blockshop.security.user.User;
import ch.noseryoung.blockshop.blockshop.security.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class JwtService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;


    public ResponseEntity<?> authenticateUserWithJWT(AuthRequest request) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getName(), request.getPassword())
            );
            User user = userRepository.findByUsername(authentication.getName());

            return ResponseEntity.ok().header("token", jwtTokenUtil.generateAccessToken(user)).build();

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong Credentials");
        }
    }
}
