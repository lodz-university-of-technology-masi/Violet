package com.it.p.lodz.pl.masi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.it.p.lodz.pl.masi.exceptions.ExceptionMessages.WRONG_ANSWER_NUMBER;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class WrongAnswerNumberException extends RuntimeException   {

    public WrongAnswerNumberException() {
        super(WRONG_ANSWER_NUMBER);
        printStackTrace();
    }
}
