package com.it.p.lodz.pl.masi.repositories;

import com.it.p.lodz.pl.masi.entities.PositionEntity;
import com.it.p.lodz.pl.masi.entities.TestEntity;
import com.it.p.lodz.pl.masi.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TestRepository extends JpaRepository<TestEntity, Long> {
    List<TestEntity> getAllByPositionByPositionIdAndActiveTrueAndDeletedFalse(PositionEntity positionEntity);
    Optional<TestEntity> getOneByIdAndUserByOwnerId(Long Id, UserEntity userEntity);
    @Query(value = "SELECT * FROM test WHERE owner_id= :#{#userId}", nativeQuery = true)
    List<TestEntity> getAllTestsAssignedToUser(@Param("userId") Long userId);
}
