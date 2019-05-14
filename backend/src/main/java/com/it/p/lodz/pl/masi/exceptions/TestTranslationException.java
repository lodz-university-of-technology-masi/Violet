package com.it.p.lodz.pl.masi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.it.p.lodz.pl.masi.exceptions.ExceptionMessages.TEST_TRANSLATION_EXCEPTION;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TestTranslationException extends RuntimeException   {

    public TestTranslationException() {
        super(TEST_TRANSLATION_EXCEPTION);
        printStackTrace();
    }
}