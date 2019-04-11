package com.it.p.lodz.pl.masi.repositories;

import com.it.p.lodz.pl.masi.entities.TestEntity;
import com.it.p.lodz.pl.masi.model.Test;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<TestEntity, Long> {
}
