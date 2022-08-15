package ch.noseryoung.blockshop.blockshop.block;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BlockRepository<Block, ID> extends JpaRepository<Block, ID> {
}