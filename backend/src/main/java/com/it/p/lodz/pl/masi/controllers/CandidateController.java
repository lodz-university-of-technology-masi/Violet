package com.it.p.lodz.pl.masi.controllers;

import com.it.p.lodz.pl.masi.dtos.RegisterCandidateDto;
import com.it.p.lodz.pl.masi.dtos.RegisterCandidateResponseDto;
import com.it.p.lodz.pl.masi.dtos.ResolveTestDto;
import com.it.p.lodz.pl.masi.services.CandidateService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CandidateController {

    private CandidateService candidateService;

    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @PostMapping("/candidate/register")
    public RegisterCandidateResponseDto registerCandidate(@RequestBody RegisterCandidateDto registerCandidateDto) {
        return candidateService.registerCandidate(registerCandidateDto);
    }

    @PostMapping("/candidate/resolved/test")
    public void resolveTest(@RequestBody ResolveTestDto resolveTestDto) {
        candidateService.resolveTest(resolveTestDto);
    }
}
