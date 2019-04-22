package com.it.p.lodz.pl.masi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.it.p.lodz.pl.masi.exceptions.ExceptionMessages.TEST_VERSION_NOT_FOUND;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TestVersionNotFoundException extends RuntimeException   {

    public TestVersionNotFoundException() {
        super(TEST_VERSION_NOT_FOUND);
        printStackTrace();
    }
}
