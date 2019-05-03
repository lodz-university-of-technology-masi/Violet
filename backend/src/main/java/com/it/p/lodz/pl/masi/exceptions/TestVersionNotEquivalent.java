package com.it.p.lodz.pl.masi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.it.p.lodz.pl.masi.exceptions.ExceptionMessages.TEST_VERSION_NOT_EQUIVALENT;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TestVersionNotEquivalent extends RuntimeException   {

    public TestVersionNotEquivalent() {
        super(TEST_VERSION_NOT_EQUIVALENT);
        printStackTrace();
    }
}