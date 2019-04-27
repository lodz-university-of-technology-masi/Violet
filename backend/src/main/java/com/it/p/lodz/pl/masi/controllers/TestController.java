package com.it.p.lodz.pl.masi.controllers;

import com.it.p.lodz.pl.masi.dtos.EditResolveTestVersionDto;
import com.it.p.lodz.pl.masi.dtos.TestDto;
import com.it.p.lodz.pl.masi.dtos.TestVersionDto;
import com.it.p.lodz.pl.masi.services.TestService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "${frontend.url}")
public class TestController {

    private TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    @GetMapping("/candidate/list/test")
    public List<TestVersionDto> getTestListForCandidate(@RequestParam(value = "positionId") long positionId, @RequestParam(value = "languageId") long languageId) {
        return testService.getTestListForCandidate(positionId, languageId);
    }

    @GetMapping("/moderator/list/test")
    public List<TestDto> getAllTests() {
        return testService.getAllTests();
    }

    @GetMapping("/test/version/{id}")
    public EditResolveTestVersionDto getTestVersionById(@PathVariable long id) {
        return testService.getTestVersionById(id);
    }
    @DeleteMapping("/moderator/test/{id}")
    public void deleteTest(@PathVariable long id) {
        testService.deleteTestById(id);
    }
}
