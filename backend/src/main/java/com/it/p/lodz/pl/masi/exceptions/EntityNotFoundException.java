package com.it.p.lodz.pl.masi.exceptions;

import org.springframework.http.HttpStatus;

public class EntityNotFoundException extends RuntimeException   {
    public EntityNotFoundException(String message) {
        super(message);
    }
}
