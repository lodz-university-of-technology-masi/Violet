package com.it.p.lodz.pl.masi.services;

import com.it.p.lodz.pl.masi.dtos.LanguageDto;
import com.it.p.lodz.pl.masi.entities.LanguageEntity;
import com.it.p.lodz.pl.masi.repositories.LanguageRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LanguageService {
    private LanguageRepository languageRepository;
    private ModelMapper mapper;

    public LanguageService(LanguageRepository languageRepository, ModelMapper mapper) {
        this.languageRepository = languageRepository;
        this.mapper = mapper;
    }

    public List<LanguageDto> getAllLanguages() {
        List<LanguageEntity> languages = this.languageRepository.getAllBy();
        var listType = new TypeToken<List<LanguageDto>>(){}.getType();
        return mapper.map(languages, listType);
    }
}
