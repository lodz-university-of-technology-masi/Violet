package com.it.p.lodz.pl.masi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.it.p.lodz.pl.masi.exceptions.ExceptionMessages.FORBIDDEN_EXCEPTION;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ForbiddenException extends RuntimeException {

    public ForbiddenException() {
        super(FORBIDDEN_EXCEPTION);
        printStackTrace();
    }
}