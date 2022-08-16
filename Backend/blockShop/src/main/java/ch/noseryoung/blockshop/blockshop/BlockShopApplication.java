package ch.noseryoung.blockshop.blockshop;

import ch.noseryoung.blockshop.blockshop.security.authority.Authority;
import ch.noseryoung.blockshop.blockshop.security.authority.AuthorityRepository;
import ch.noseryoung.blockshop.blockshop.security.role.Role;
import ch.noseryoung.blockshop.blockshop.security.role.RoleRepository;
import ch.noseryoung.blockshop.blockshop.security.user.User;
import ch.noseryoung.blockshop.blockshop.security.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication
public class BlockShopApplication {
	public static void main(String[] args) {
		SpringApplication.run(BlockShopApplication.class, args);
	}

	@Autowired
	AuthorityRepository authorityRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;

	@EventListener
	public void startValues(ApplicationReadyEvent ignore) {
		Authority get = new Authority("get");
		Authority post = new Authority("post");
		Authority put = new Authority("put");
		Authority delete = new Authority("delete");

		authorityRepository.save(get);
		authorityRepository.save(post);
		authorityRepository.save(put);
		authorityRepository.save(delete);

		Role admin = new Role("admin", List.of(get, post, put, delete));
		Role staff = new Role("staff", List.of(get, post, put));
		Role user = new Role("user", List.of(get));

		roleRepository.save(admin);
		roleRepository.save(staff);
		roleRepository.save(user);

		User admin_user = new User("admin", "123", admin);

		userRepository.save(admin_user);
	}

}
