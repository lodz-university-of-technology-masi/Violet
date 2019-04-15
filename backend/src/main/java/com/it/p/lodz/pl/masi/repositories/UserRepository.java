package com.it.p.lodz.pl.masi.repositories;

import com.it.p.lodz.pl.masi.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
}
