package ch.noseryoung.blockshop.blockshop.block;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/block")
public class BlockController {
    @Autowired
    private BlockService blockService;

    @GetMapping("/")
    public ResponseEntity<List<Block>> getAllBlock() {
        return ResponseEntity.ok(blockService.getAllBlocks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Block> getBlock(@PathVariable("id") Long id) {
        return ResponseEntity.ok(blockService.getBlock(id));
    }

    @PostMapping("")
    public ResponseEntity<Block> postBlock(@RequestBody @Valid Block block) {
        return ResponseEntity.ok(blockService.postBlock(block));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Block> putBlock(@PathVariable("id") Long id, @RequestBody @Valid Block block) {
        return ResponseEntity.ok(blockService.putBlock(block, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBlock(@PathVariable("id") Long id) {
        blockService.deleteBlock(id);
        return ResponseEntity.ok("Success");
    }
}
