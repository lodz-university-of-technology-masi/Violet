package com.it.p.lodz.pl.masi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.it.p.lodz.pl.masi.exceptions.ExceptionMessages.RESOLVED_TEST_NOT_FOUND;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ResolvedTestNotFoundException extends RuntimeException   {

    public ResolvedTestNotFoundException() {
        super(RESOLVED_TEST_NOT_FOUND);
        printStackTrace();
    }
}