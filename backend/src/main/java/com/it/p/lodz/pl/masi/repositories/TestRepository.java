package com.it.p.lodz.pl.masi.repositories;

import com.it.p.lodz.pl.masi.entities.PositionEntity;
import com.it.p.lodz.pl.masi.entities.TestEntity;
import com.it.p.lodz.pl.masi.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TestRepository extends JpaRepository<TestEntity, Long> {
    List<TestEntity> getAllByPositionByPositionIdAndActiveTrueAndDeletedFalse(PositionEntity positionEntity);
    Optional<TestEntity> getOneByIdAndUserByOwnerIdAndDeletedFalseAndActiveTrue(Long Id, UserEntity userEntity);
}
