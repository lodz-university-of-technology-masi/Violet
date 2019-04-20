package com.it.p.lodz.pl.masi.repositories;

import com.it.p.lodz.pl.masi.entities.PositionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
//@RepositoryRestResource
@CrossOrigin(origins = "http://localhost:4200")
public interface PositionRepository extends JpaRepository<PositionEntity, Long> {
    @Query(value = "SELECT * FROM position WHERE is_active", nativeQuery = true)
    List<PositionEntity> findAllByActiveTrue();

    @Query(value = "SELECT * FROM position", nativeQuery = true)
    List<PositionEntity> findAll();

}
