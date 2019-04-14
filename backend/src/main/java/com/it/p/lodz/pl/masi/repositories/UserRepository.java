package com.it.p.lodz.pl.masi.repositories;

import com.it.p.lodz.pl.masi.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @Query(value = "select * from \"user\" where \"id\" =" +
            "(select \"user_id\" from \"user_role\" where \"role_id\" =" +
            "(select \"id\" from \"role\" where \"name\" ='editor'))",
            nativeQuery = true)
    List<UserEntity> findAllEditors();
}
