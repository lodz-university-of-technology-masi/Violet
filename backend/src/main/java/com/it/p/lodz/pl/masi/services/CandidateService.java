package com.it.p.lodz.pl.masi.services;

import com.it.p.lodz.pl.masi.dtos.RegisterCandidateDto;
import com.it.p.lodz.pl.masi.dtos.RegisterCandidateResponseDto;
import com.it.p.lodz.pl.masi.dtos.ResolveTestDto;
import com.it.p.lodz.pl.masi.entities.CandidateEntity;
import com.it.p.lodz.pl.masi.entities.CandidateTokenEntity;
import com.it.p.lodz.pl.masi.entities.LanguageEntity;
import com.it.p.lodz.pl.masi.entities.PositionEntity;
import com.it.p.lodz.pl.masi.entities.ResolvedTestEntity;
import com.it.p.lodz.pl.masi.exceptions.LanguageNotFoundException;
import com.it.p.lodz.pl.masi.exceptions.PositionNotFoundException;
import com.it.p.lodz.pl.masi.model.Test;
import com.it.p.lodz.pl.masi.model.TestAnswer;
import com.it.p.lodz.pl.masi.repositories.CandidateRepository;
import com.it.p.lodz.pl.masi.repositories.CandidateTokenRepository;
import com.it.p.lodz.pl.masi.repositories.LanguageRepository;
import com.it.p.lodz.pl.masi.repositories.PositionRepository;
import com.it.p.lodz.pl.masi.repositories.TestVersionRepository;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.Optional;
import java.util.UUID;

@Component
public class CandidateService {
    private CandidateRepository candidateRepository;
    private CandidateTokenRepository candidateTokenRepository;
    private LanguageRepository languageRepository;
    private PositionRepository positionRepository;
    private ModelMapper modelMapper;
    private TestVersionRepository testVersionRepository;

    public CandidateService(CandidateRepository candidateRepository, CandidateTokenRepository candidateTokenRepository,
                            LanguageRepository languageRepository, PositionRepository positionRepository, ModelMapper modelMapper,
                            TestVersionRepository testVersionRepository) {
        this.candidateRepository = candidateRepository;
        this.candidateTokenRepository = candidateTokenRepository;
        this.languageRepository = languageRepository;
        this.positionRepository = positionRepository;
        this.modelMapper = modelMapper;
        this.testVersionRepository = testVersionRepository;
    }

    @Transactional
    public RegisterCandidateResponseDto registerCandidate(RegisterCandidateDto registerCandidateDto) {
        CandidateEntity candidateEntity = new CandidateEntity();
        candidateEntity.setFirstName(registerCandidateDto.getFirstName());
        candidateEntity.setLastName(registerCandidateDto.getLastName());
        candidateEntity.setEmail(registerCandidateDto.getEmail());
        candidateEntity.setLanguageByLanguageId(getLanguageEntityForId(registerCandidateDto.getLanguageId()));
        candidateEntity.setPositionByPositionId(getPositionEntityForId(registerCandidateDto.getPositionId()));

        candidateRepository.saveAndFlush(candidateEntity);

        String candidateToken = UUID.randomUUID().toString();
        CandidateTokenEntity candidateTokenEntity = new CandidateTokenEntity();
        candidateTokenEntity.setCandidateByCandidateId(candidateEntity);
        candidateTokenEntity.setToken(candidateToken);
        candidateTokenEntity.setExpireDate(new Timestamp(System.currentTimeMillis() + 60 * 60 * 1000));

        candidateTokenRepository.saveAndFlush(candidateTokenEntity);

        RegisterCandidateResponseDto registerCandidateResponseDto = new RegisterCandidateResponseDto();
        registerCandidateResponseDto.setToken(candidateToken);
        return registerCandidateResponseDto;
    }

    private LanguageEntity getLanguageEntityForId(String id) {
        Optional<LanguageEntity> languageEntity = languageRepository.getById(Long.parseLong(id));
        return languageEntity.orElseThrow(LanguageNotFoundException::new);
    }

    private PositionEntity getPositionEntityForId(String id) {
        Optional<PositionEntity> positionEntity = positionRepository.getById(Long.parseLong(id));
        return positionEntity.orElseThrow(PositionNotFoundException::new);
    }

    public void resolveTest(ResolveTestDto dto)
    {
        var resolvedTest = new ResolvedTestEntity();
        resolvedTest.setAnswer(new TestAnswer(dto.getAnswers()));
        var candidate = candidateRepository.getOne(dto.getCandidateId());
        resolvedTest.setCandidateByCandidateId(candidate);
        resolvedTest.setLanguageByLanguageId(candidate.getLanguageByLanguageId());
        resolvedTest.setPointsMax(dto.getAnswers().size());
        resolvedTest.setPositionByPositionId(candidate.getPositionByPositionId());
        resolvedTest.setTest(dto.getTest());
        resolvedTest.setUserByOwnerId(testVersionRepository.getOne(dto.getTestVersionId()).getTestByTestId().getUserByOwnerId());
    }
}
