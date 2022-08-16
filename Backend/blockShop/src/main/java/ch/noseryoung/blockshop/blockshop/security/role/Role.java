package ch.noseryoung.blockshop.blockshop.security.role;

import ch.noseryoung.blockshop.blockshop.security.authority.Authority;
import lombok.AllArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "role")
@AllArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "authority_id", referencedColumnName = "id"))
    private List<Authority> authorities;

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}
    public String getName() {return name;}
    public void setName(String name) {this.name = name;}
    public List<Authority> getAuthorities() {return authorities;}
    public void setAuthorities(List<Authority> authorities) {this.authorities = authorities;}

    public Role() {}
    public Role(String name, List<Authority> authorities) {
        this.name = name;
        this.authorities = authorities;
    }
}