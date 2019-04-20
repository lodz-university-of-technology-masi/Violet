package com.it.p.lodz.pl.masi.controllers;

import com.it.p.lodz.pl.masi.exceptions.ApiError;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolationException;

import static com.it.p.lodz.pl.masi.exceptions.ExceptionMessages.DESERIALIZATION_EXCEPTION;

@ControllerAdvice
public class CustomRestExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        ApiError apiError =
                new ApiError("400", HttpStatus.BAD_REQUEST, DESERIALIZATION_EXCEPTION);
        return new ResponseEntity<>(apiError, new HttpHeaders(), apiError.getErrors());
    }

    @ExceptionHandler({ConstraintViolationException.class})
    public ResponseEntity<Object> handleConstraintViolation(ConstraintViolationException ex, WebRequest request) {
        ApiError apiError =
                new ApiError("400", HttpStatus.BAD_REQUEST, ex.getConstraintViolations().iterator().next().getMessage());
        return new ResponseEntity<>(apiError, new HttpHeaders(), apiError.getErrors());
    }

    @ExceptionHandler({DataIntegrityViolationException.class})
    public ResponseEntity<Object> handleDataIntegrityViolationException(DataIntegrityViolationException ex, WebRequest request) {
        org.hibernate.exception.ConstraintViolationException exception = (org.hibernate.exception.ConstraintViolationException) ex.getCause();
        ApiError apiError =
                new ApiError("400", HttpStatus.BAD_REQUEST, exception.getConstraintName());
        return new ResponseEntity<>(apiError, new HttpHeaders(), apiError.getErrors());
    }

    @ExceptionHandler({ Exception.class })
    public ResponseEntity<Object> handleAll(Exception ex, WebRequest request) {
        ApiError apiError =
                new ApiError("400", HttpStatus.BAD_REQUEST, ex.getMessage());
        return new ResponseEntity<>(apiError, new HttpHeaders(), apiError.getErrors());
    }
}
