package com.it.p.lodz.pl.masi.repositories;

import com.it.p.lodz.pl.masi.entities.UserRoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRoleEntity, Long> {
}
