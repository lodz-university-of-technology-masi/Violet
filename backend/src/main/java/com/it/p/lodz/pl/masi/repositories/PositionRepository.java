package com.it.p.lodz.pl.masi.repositories;

import com.it.p.lodz.pl.masi.entities.PositionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PositionRepository extends JpaRepository<PositionEntity, Long> {
    @Query(value = "SELECT * FROM position WHERE is_active", nativeQuery = true)
    List<PositionEntity> findAllActive();
}
