package ch.noseryoung.blockshop.blockshop.block;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/block")
public class BlockController {
    @GetMapping("/:id")
    public void getBlock() {

    }

    @GetMapping("/")
    public void getAllBlock() {}

    @DeleteMapping("/")
    public void deleteBlock() {}

    @PutMapping("/")
    public void putBlock() {}

    @PostMapping("/")
    public void postBlock() {}
}
