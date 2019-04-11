package com.it.p.lodz.pl.masi.repositories;

import com.it.p.lodz.pl.masi.entities.CandidateEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<CandidateEntity, Long> {
}
