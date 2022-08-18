package ch.noseryoung.blockshop.blockshop.block;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BlockRepository extends JpaRepository<Block, Long> {
    @Query(value = "SELECT * FROM block LIMIT ?1 OFFSET ?2", nativeQuery = true)
    List<Block> getWithRange(Long max, Long start);
}