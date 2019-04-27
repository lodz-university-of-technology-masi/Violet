package com.it.p.lodz.pl.masi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.it.p.lodz.pl.masi.exceptions.ExceptionMessages.POSITION_NOT_FOUND;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class PositionNotFoundException extends RuntimeException {

    public PositionNotFoundException() {
        super(POSITION_NOT_FOUND);
        printStackTrace();
    }
}
