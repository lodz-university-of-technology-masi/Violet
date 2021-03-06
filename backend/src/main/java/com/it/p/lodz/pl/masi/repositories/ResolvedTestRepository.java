package com.it.p.lodz.pl.masi.repositories;

import com.it.p.lodz.pl.masi.entities.ResolvedTestEntity;
import com.it.p.lodz.pl.masi.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResolvedTestRepository extends JpaRepository<ResolvedTestEntity, Long> {
    List<ResolvedTestEntity> getAllByUserByOwnerId(UserEntity userEntity);
    Optional<ResolvedTestEntity> findOneByIdAndUserByOwnerId(Long id, UserEntity userEntity);
}
