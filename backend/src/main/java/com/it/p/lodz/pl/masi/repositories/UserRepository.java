package com.it.p.lodz.pl.masi.repositories;

import com.it.p.lodz.pl.masi.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @Query(value = "select * from \"user\" where \"id\" IN" +
            "(select \"user_id\" from \"user_role\" where \"role_id\" =" +
            "(select \"id\" from \"role\" where \"name\" ='redactor')) and " +
            "is_deleted = false ",
            nativeQuery = true)
    List<UserEntity> findAllRedactors();

    UserEntity findOneByIdAndDeletedFalse(Long id);

    Optional<UserEntity> findOneByEmail(String email);
}
