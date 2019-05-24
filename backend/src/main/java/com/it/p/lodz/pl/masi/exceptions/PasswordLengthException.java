package com.it.p.lodz.pl.masi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.it.p.lodz.pl.masi.exceptions.ExceptionMessages.WRONG_PASSWORD_LENGTH;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class PasswordLengthException  extends RuntimeException {

    public PasswordLengthException() {
        super(WRONG_PASSWORD_LENGTH);
        printStackTrace();
    }
}
