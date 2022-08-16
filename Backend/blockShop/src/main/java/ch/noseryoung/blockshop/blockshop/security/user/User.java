package ch.noseryoung.blockshop.blockshop.security.user;

import ch.noseryoung.blockshop.blockshop.security.role.Role;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "user")
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}
    public String getName() {return username;}
    public void setName(String name) {this.username = name;}
    public String getPassword() {return password;}
    public void setPassword(String password) {this.password = password;}
    public Role getRole() {return role;}
    public void setRole(Role role) {this.role = role;}

    public User() {}
    public User(String name, String password, Role role) {
        this.username = name;
        this.password = password;
        this.role = role;
    }
}