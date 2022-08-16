package ch.noseryoung.blockshop.blockshop.security.user;

import ch.noseryoung.blockshop.blockshop.security.role.RoleRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    private static final Logger log = LogManager.getLogger(UserService.class);

    public List<User> getAllUsers() {
        log.info("Getting all Users");
        return userRepository.findAll();
    }
    public User getUser(Long id) {
        log.info("Getting User with id : " + id);
        return userRepository.getReferenceById(id);
    }
    public User postUser(User user) {
        log.info("Posting User with id : " + user.getId());
        if (user.getRole() == null) user.setRole(roleRepository.getByName("user"));
        return userRepository.save(user);
    }
    public User putUser(User user, Long id) {
        log.info("Putting User with id : " + user.getId());
        if (!userRepository.existsById(id)) return null;
        if (user.getRole() == null) user.setRole(roleRepository.getByName("user"));
        user.setId(id);
        return userRepository.save(user);
    }
    public void deleteUser(Long id) {
        log.info("Deleting User with id : " + id);
        userRepository.deleteById(id);
    }
}
