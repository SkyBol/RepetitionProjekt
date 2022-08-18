package ch.noseryoung.blockshop.blockshop.block;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class BlockService {
    private static final Logger log = LogManager.getLogger(BlockService.class);

    @Autowired
    private BlockRepository blockRepository;
    public List<Block> getAllBlocksRange(Long max, Long start) {
        if (max < 0 || start < 0)
            return Collections.emptyList();
        log.info("Getting Blocks in Range. MAX: " + max + " - START: " + start);
        return blockRepository.getWithRange(max, start);
    }
    public List<Block> getAllBlocks() {
        log.info("Getting all Blocks");
        return blockRepository.findAll();
    }
    public Block getBlock(Long id) {
        log.info("Getting Block with id : " + id);
        return blockRepository.getReferenceById(id);
    }
    public Block postBlock(Block block) {
        log.info("Posting new Block");
        return blockRepository.save(block);
    }
    public Block putBlock(Block block, Long id) {
        log.info("Putting Block with id : " + block.getId());
        if (!blockRepository.existsById(id)) return null;
        block.setId(id);
        return blockRepository.save(block);
    }
    public void deleteBlock(Long id) {
        log.info("Deleting Block with id : " + id);
        blockRepository.deleteById(id);
    }
}
