package ch.noseryoung.blockshop.blockshop.block;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "block")
public class Block {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "image_link", nullable = false)
    private String imageLink;

    @Column(nullable = false)
    @Size(max = 20000)
    private String description;

    public Block () {}
    public Block (String name, String imageLink, String description) {
        this.name = name;
        this.imageLink = imageLink;
        this.description = description;
    }

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}
    public String getName() {return name;}
    public void setName(String name) {this.name = name;}
    public String getImageLink() {return imageLink;}
    public void setImageLink(String imageLink) {this.imageLink = imageLink;}
    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}
}