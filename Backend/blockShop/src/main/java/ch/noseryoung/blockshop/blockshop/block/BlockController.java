package ch.noseryoung.blockshop.blockshop.block;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/block")
public class BlockController {
    @Autowired
    private BlockService blockService;

    @GetMapping("/")
    public ResponseEntity<List<Block>> getAllBlock(@RequestParam("max") Optional<Long> max, @RequestParam("start") Optional<Long> start) {
        if (max.isPresent() && start.isPresent())
            return ResponseEntity.ok(blockService.getAllBlocksRange(max.get(), start.get()));
        return ResponseEntity.ok(blockService.getAllBlocks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Block> getBlock(@PathVariable("id") Long id) {
        return ResponseEntity.ok(blockService.getBlock(id));
    }

    @PostMapping("/")
    public ResponseEntity<Block> postBlock(@RequestBody @Valid Block block) {
        return ResponseEntity.ok(blockService.postBlock(block));
    }
    @PostMapping("/image/{id}")
    public ResponseEntity<String> postImage(@PathVariable("id") Long id, @RequestPart("file") MultipartFile multipartFile) {
        try {return ResponseEntity.ok(blockService.postImage(id, multipartFile));}
        catch (IOException e) {return ResponseEntity.status(400).body("Error");}
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
