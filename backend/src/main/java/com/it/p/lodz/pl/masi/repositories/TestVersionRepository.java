package com.it.p.lodz.pl.masi.repositories;

import com.it.p.lodz.pl.masi.entities.LanguageEntity;
import com.it.p.lodz.pl.masi.entities.TestEntity;
import com.it.p.lodz.pl.masi.entities.TestVersionEntity;
import com.it.p.lodz.pl.masi.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TestVersionRepository extends JpaRepository<TestVersionEntity, Long> {
    List<TestVersionEntity> getAllByLanguageByLanguageIdAndTestByTestIdAndActiveTrueAndDeletedFalse(LanguageEntity languageEntity, List<TestEntity> testEntities);
    List<TestVersionEntity> getAllByDeletedFalse();
    Optional<TestVersionEntity> getOneByIdAndDeletedFalseAndActiveTrue(Long id);
    Optional<TestVersionEntity> getOneByIdAndTestByTestId_UserByOwnerId(Long id, UserEntity userEntity);
    Optional<TestVersionEntity> getFirstByTestByTestIdAndTestByTestId_UserByOwnerId(TestEntity testEntity, UserEntity userEntity);
}
