package com.it.p.lodz.pl.masi.exceptions;

import org.springframework.http.HttpStatus;

public class ApiError {

    private String status;
    private HttpStatus error;
    private String message;

    public ApiError(String status, HttpStatus error, String message) {
        super();
        this.status = status;
        this.message = message;
        this.error = error;
    }

    public String getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public HttpStatus getErrors() {
        return error;
    }
}
