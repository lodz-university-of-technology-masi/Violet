package com.it.p.lodz.pl.masi.services;

import com.it.p.lodz.pl.masi.dtos.EditResolveTestVersionDto;
import com.it.p.lodz.pl.masi.dtos.TestDto;
import com.it.p.lodz.pl.masi.dtos.TestVersionDto;
import com.it.p.lodz.pl.masi.entities.PositionEntity;
import com.it.p.lodz.pl.masi.entities.TestEntity;
import com.it.p.lodz.pl.masi.entities.TestVersionEntity;
import com.it.p.lodz.pl.masi.exceptions.TestVersionNotFoundException;
import com.it.p.lodz.pl.masi.repositories.LanguageRepository;
import com.it.p.lodz.pl.masi.repositories.PositionRepository;
import com.it.p.lodz.pl.masi.repositories.TestRepository;
import com.it.p.lodz.pl.masi.repositories.TestVersionRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class TestService {
    private TestVersionRepository testVersionRepository;
    private TestRepository testRepository;
    private LanguageRepository languageRepository;
    private PositionRepository positionRepository;
    private ModelMapper modelMapper;

    public TestService(TestVersionRepository testVersionRepository, TestRepository testRepository, LanguageRepository languageRepository, PositionRepository positionRepository, ModelMapper modelMapper) {
        this.testVersionRepository = testVersionRepository;
        this.testRepository = testRepository;
        this.languageRepository = languageRepository;
        this.positionRepository = positionRepository;
        this.modelMapper = modelMapper;
    }

    public List<TestVersionDto> getTestListForCandidate(Long positionId, Long languageId) {
        List<TestEntity> tests = testRepository.getAllByPositionByPositionIdAndActiveTrueAndDeletedFalse(positionRepository.getOne(positionId));
        List<TestVersionEntity> testVersions = testVersionRepository.
                getAllByLanguageByLanguageIdAndTestByTestIdAndActiveTrueAndDeletedFalse(languageRepository.getOne(languageId), tests);
        Type listType = new TypeToken<List<TestVersionDto>>() {}.getType();
        return modelMapper.map(testVersions, listType);
    }

    public List<TestDto> getAllTests() {
        var versions = testVersionRepository.getAllByDeletedFalse();
        var groupedVersions = versions.stream().collect(Collectors.groupingBy(TestVersionEntity::getTestByTestId));

        var tests = new ArrayList<TestDto>();
        Type listType = new TypeToken<List<TestVersionDto>>() {}.getType();

        for(var test : groupedVersions.keySet()) {
            var testDto = new TestDto();
            testDto.setId(Long.toString(test.getId()));
            testDto.setTestVersions(modelMapper.map(groupedVersions.get(test), listType));
            tests.add(testDto);
        }

        return tests;
    }

    public EditResolveTestVersionDto getTestVersionById(long id) {
        Optional<TestVersionEntity> testVersionEntity = testVersionRepository.getOneByIdAndDeletedFalseAndActiveTrue(id);
        return testVersionEntity
                .map($ -> modelMapper.map($, EditResolveTestVersionDto.class))
                .orElseThrow(TestVersionNotFoundException::new);
    }
    public void assignTestToPosition(Long positionId, Long testId) {
        var valuePosition = positionRepository.findById(positionId);
        var valueTest = testRepository.findById(testId);
        if (valuePosition.isPresent() && valueTest.isPresent()) {
            TestEntity test = valueTest.get();
            PositionEntity position = valuePosition.get();
            position.addTestToPosition(test);
            this.positionRepository.saveAndFlush(position);
        }
    }
    public void deleteTestById(long testId) {
        var value = testRepository.findById(testId);
        if (value.isPresent()) {
            TestEntity testToDelete = value.get();
            testToDelete.setDeleted(true);
            var testVersions = testToDelete.getTestVersionsById();
            for(TestVersionEntity version :testVersions){
                version.setDeleted(true);
            }
            this.testRepository.saveAndFlush(testToDelete);
            this.testVersionRepository.saveAll(testVersions);
        }
    }
}
