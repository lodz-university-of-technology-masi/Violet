package com.it.p.lodz.pl.masi.controllers;

import com.it.p.lodz.pl.masi.dtos.LanguageDto;
import com.it.p.lodz.pl.masi.services.LanguageService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LanguageController {
    private LanguageService languageService;

    public LanguageController(LanguageService languageService) {
        this.languageService = languageService;
    }

    @GetMapping("/language/list")
    public List<LanguageDto> getAllLanguages() {
        return languageService.getAllLanguages();
    }
}
