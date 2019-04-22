package com.it.p.lodz.pl.masi.controllers;

import com.it.p.lodz.pl.masi.dtos.RegisterCandidateDto;
import com.it.p.lodz.pl.masi.dtos.RegisterCandidateResponseDto;
import com.it.p.lodz.pl.masi.services.CandidateService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CandidateController {

    private CandidateService candidateService;

    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @PostMapping("/candidate/register")
    public RegisterCandidateResponseDto registerCandidate(@RequestBody RegisterCandidateDto registerCandidateDto) {
        return candidateService.registerCandidate(registerCandidateDto);
    }
}
