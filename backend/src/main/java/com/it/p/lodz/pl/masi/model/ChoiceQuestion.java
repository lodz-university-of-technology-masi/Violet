package com.it.p.lodz.pl.masi.model;

import java.util.ArrayList;
import java.util.List;

public class ChoiceQuestion extends Question {
    private List<String> answers = new ArrayList<>();

    public List<String> getAnswers() {
        return answers;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }
}
