package ch.noseryoung.blockshop.blockshop.block;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BlockRepository extends JpaRepository<Block, Long> {
    @Query(value = "SELECT * FROM block ORDER BY name LIMIT ?1 OFFSET ?2", nativeQuery = true)
    List<Block> getWithRangeAndOrder(Long max, Long start);

    @Query(value = "SELECT * FROM block WHERE name LIKE %?3% ORDER BY name LIMIT ?1 OFFSET ?2", nativeQuery = true)
    List<Block> getWithRangeAndWhereNameAndOrder(Long max, Long start, String nameLike);
}