package com.it.p.lodz.pl.masi.services;

import com.it.p.lodz.pl.masi.dtos.RegisterCandidateDto;
import com.it.p.lodz.pl.masi.dtos.RegisterCandidateResponseDto;
import com.it.p.lodz.pl.masi.dtos.ResolveTestDto;
import com.it.p.lodz.pl.masi.entities.*;
import com.it.p.lodz.pl.masi.exceptions.CandidateNotFoundException;
import com.it.p.lodz.pl.masi.exceptions.InvalidTokenException;
import com.it.p.lodz.pl.masi.exceptions.LanguageNotFoundException;
import com.it.p.lodz.pl.masi.exceptions.PositionNotFoundException;
import com.it.p.lodz.pl.masi.exceptions.WrongAnswerNumberException;
import com.it.p.lodz.pl.masi.model.Test;
import com.it.p.lodz.pl.masi.model.TestAnswer;
import com.it.p.lodz.pl.masi.repositories.*;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.time.LocalDateTime;
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
    private ResolvedTestRepository resolvedTestRepository;

    public CandidateService(CandidateRepository candidateRepository, CandidateTokenRepository candidateTokenRepository,
                            LanguageRepository languageRepository, PositionRepository positionRepository, ModelMapper modelMapper,
                            TestVersionRepository testVersionRepository, ResolvedTestRepository resolvedTestRepository) {
        this.candidateRepository = candidateRepository;
        this.candidateTokenRepository = candidateTokenRepository;
        this.languageRepository = languageRepository;
        this.positionRepository = positionRepository;
        this.modelMapper = modelMapper;
        this.testVersionRepository = testVersionRepository;
        this.resolvedTestRepository = resolvedTestRepository;
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
        var testVersion = testVersionRepository.getOne(Long.parseLong(dto.getTest().getId()));

        CandidateEntity candidate = null;
        try {
            var token = candidateTokenRepository.getAllByToken(dto.getCandidateToken()).get(0);
            if(!token.isActive() || token.getExpireDate().compareTo(new Timestamp(System.currentTimeMillis() + 60 * 60 * 1000)) > 0)
                throw new InvalidTokenException();
            candidate = token.getCandidateByCandidateId();
        } catch(IndexOutOfBoundsException e) {
            throw new CandidateNotFoundException();
        }

        var questions = testVersion.getTest().getChoiceQuestions().size() +
                testVersion.getTest().getScaleQuestions().size() +
                testVersion.getTest().getOpenQuestions().size() +
                testVersion.getTest().getNumericQuestions().size();
        if(dto.getAnswers().size() != questions)
            throw new WrongAnswerNumberException();

        resolvedTest.setAnswer(new TestAnswer(dto.getAnswers()));
        resolvedTest.setCandidateByCandidateId(candidate);
        resolvedTest.setLanguageByLanguageId(candidate.getLanguageByLanguageId());
        resolvedTest.setPointsMax(getMaxPoints(dto.getTest().getTest()));
        resolvedTest.setPositionByPositionId(candidate.getPositionByPositionId());
        resolvedTest.setTest(dto.getTest().getTest());
        resolvedTest.setUserByOwnerId(testVersion.getTestByTestId().getUserByOwnerId());

        resolvedTestRepository.saveAndFlush(resolvedTest);
    }

    private int getMaxPoints(Test test) {
        return test.getChoiceQuestions().size() +
                test.getNumericQuestions().size() +
                test.getOpenQuestions().size() +
                test.getScaleQuestions().size();
    }
}
