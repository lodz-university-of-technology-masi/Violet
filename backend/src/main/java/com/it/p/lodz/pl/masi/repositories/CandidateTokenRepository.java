package com.it.p.lodz.pl.masi.repositories;

import com.it.p.lodz.pl.masi.entities.CandidateEntity;
import com.it.p.lodz.pl.masi.entities.CandidateTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidateTokenRepository extends JpaRepository<CandidateTokenEntity, Long> {
    public List<CandidateTokenEntity> getAllByToken(String token);
}
