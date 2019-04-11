package com.it.p.lodz.pl.masi.controllers;


import com.it.p.lodz.pl.masi.model.Test;
import com.it.p.lodz.pl.masi.services.TestService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    private TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    //TODO: Review or delete
    @GetMapping("/test")
    public Test getTestByTestVersionId(@RequestParam(value = "id") long id) {
        return testService.getTestByTestVersionId(id);
    }
}
