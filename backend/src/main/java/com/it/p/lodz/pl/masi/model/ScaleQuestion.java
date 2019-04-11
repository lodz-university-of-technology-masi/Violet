package com.it.p.lodz.pl.masi.model;

import java.util.ArrayList;
import java.util.List;

public class ScaleQuestion extends Question {
    private List<Integer> answers = new ArrayList<>();

    public List<Integer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Integer> answers) {
        this.answers = answers;
    }
}
