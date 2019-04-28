package com.it.p.lodz.pl.masi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.it.p.lodz.pl.masi.exceptions.ExceptionMessages.PASSWORD_MISMATCH;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class PasswordMismatchException extends RuntimeException {

    public PasswordMismatchException() {
        super(PASSWORD_MISMATCH);
        printStackTrace();
    }
}