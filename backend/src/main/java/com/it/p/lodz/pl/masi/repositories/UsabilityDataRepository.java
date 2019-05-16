package com.it.p.lodz.pl.masi.repositories;

import com.it.p.lodz.pl.masi.entities.UsabilityDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface UsabilityDataRepository extends JpaRepository<UsabilityDataEntity, Long> {
    List<UsabilityDataEntity> getAllByUsername(String username);

}
