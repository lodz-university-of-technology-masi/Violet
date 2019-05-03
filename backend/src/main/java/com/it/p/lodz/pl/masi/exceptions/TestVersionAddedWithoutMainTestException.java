package com.it.p.lodz.pl.masi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.it.p.lodz.pl.masi.exceptions.ExceptionMessages.TEST_VERSION_ADDED_WITHOUT_MAIN_TEST;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TestVersionAddedWithoutMainTestException extends RuntimeException   {

    public TestVersionAddedWithoutMainTestException() {
        super(TEST_VERSION_ADDED_WITHOUT_MAIN_TEST);
        printStackTrace();
    }
}