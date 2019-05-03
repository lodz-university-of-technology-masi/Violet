package com.it.p.lodz.pl.masi.controllers;

import com.it.p.lodz.pl.masi.dtos.*;
import com.it.p.lodz.pl.masi.services.TestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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

    @PutMapping("/moderator/test/assign")
    public void assignTestToPosition(@RequestParam(value = "positionId") Long positionId, @RequestParam(value = "testId") Long testId) {
        testService.assignTestToPosition(positionId, testId);
    }

    @PutMapping("/moderator/test")
    public void modifyAnyTestById(@RequestBody ModifyTestVersionDto testVersionDto) {
        testService.modifyTest(testVersionDto);
    }

    @PostMapping("/redactor/test/version/add")
    public void addTestVersion(@RequestBody NewTestVersionDto newTestVersionDto) {
        testService.addTestVersion(newTestVersionDto);
    }

    @PutMapping("/redactor/test")
    public void modifyMyTestById(@RequestBody ModifyTestVersionDto testVersionDto) {
        testService.modifyMyTest(testVersionDto);
    }

    @DeleteMapping("/moderator/test/{id}")
    public void deleteTest(@PathVariable long id) {
        testService.deleteTestById(id);
    }

    @PostMapping("/redactor/test/add")
    public void addNewTest(@RequestBody NewTestDto newTestDto) {
        this.testService.addNewTest(newTestDto);
    }
}
