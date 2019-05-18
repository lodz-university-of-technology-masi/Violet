package com.it.p.lodz.pl.masi.controllers;

import com.it.p.lodz.pl.masi.dtos.FullResolvedTestDto;
import com.it.p.lodz.pl.masi.dtos.MarkedResolvedTestDto;
import com.it.p.lodz.pl.masi.dtos.ResolvedTestDto;
import com.it.p.lodz.pl.masi.services.ResolvedTestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ResolvedTestController {

    private ResolvedTestService resolvedTestService;

    public ResolvedTestController(ResolvedTestService resolvedTestService) {
        this.resolvedTestService = resolvedTestService;
    }

    @GetMapping("/redactor/list/test/resolved")
    public List<ResolvedTestDto> getAllResolvedTestsForUser() {
        return resolvedTestService.getAllResolvedTestsForUser();
    }

    @GetMapping("/redactor/test/resolved/{id}")
    public FullResolvedTestDto getOwnResolvedTestById(@PathVariable Long id) {
        return resolvedTestService.getOwnResolvedTestById(id);
    }

    @PutMapping("/redactor/test/resolved/mark")
    public void markMyTestById(@RequestBody MarkedResolvedTestDto markedResolvedTestDto) {
        resolvedTestService.markTest(markedResolvedTestDto);
    }
}
