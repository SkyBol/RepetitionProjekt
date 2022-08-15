package ch.noseryoung.blockshop.blockshop.block;

import javax.persistence.*;

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

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}
    public String getName() {return name;}
    public void setName(String name) {this.name = name;}
    public String getImageLink() {return imageLink;}
    public void setImageLink(String imageLink) {this.imageLink = imageLink;}
}