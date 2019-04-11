package com.it.p.lodz.pl.masi.services;

import com.it.p.lodz.pl.masi.model.Test;
import com.it.p.lodz.pl.masi.repositories.LanguageRepository;
import com.it.p.lodz.pl.masi.repositories.TestRepository;
import com.it.p.lodz.pl.masi.repositories.TestVersionRepository;
import org.springframework.stereotype.Component;

@Component
public class TestService {
    private TestVersionRepository testVersionRepository;
    private TestRepository testRepository;
    private LanguageRepository languageRepository;

    public TestService(TestVersionRepository testVersionRepository, TestRepository testRepository, LanguageRepository languageRepository) {
        this.testVersionRepository = testVersionRepository;
        this.testRepository = testRepository;
        this.languageRepository = languageRepository;
    }

    //TODO: Review or delete
    public Test getTestByTestVersionId(Long id) {
        return testVersionRepository.getOne(id).getTest();
    }
}
