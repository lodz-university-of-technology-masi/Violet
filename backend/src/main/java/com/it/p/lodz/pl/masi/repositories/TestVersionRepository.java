package com.it.p.lodz.pl.masi.repositories;

import com.it.p.lodz.pl.masi.entities.LanguageEntity;
import com.it.p.lodz.pl.masi.entities.TestEntity;
import com.it.p.lodz.pl.masi.entities.TestVersionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestVersionRepository extends JpaRepository<TestVersionEntity, Long> {
    List<TestVersionEntity> getAllByLanguageByLanguageIdAndTestByTestIdAndActiveTrueAndDeletedFalse(LanguageEntity languageEntity, List<TestEntity> testEntities);
    List<TestVersionEntity> getAllByDeletedFalse();
    TestVersionEntity getOneByIdAndDeletedFalseAndActiveTrue(Long id);
}
