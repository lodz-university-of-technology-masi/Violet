package com.it.p.lodz.pl.masi.repositories;

import com.it.p.lodz.pl.masi.entities.LanguageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LanguageRepository extends JpaRepository<LanguageEntity, Long> {
    List<LanguageEntity> getAllBy();
}
