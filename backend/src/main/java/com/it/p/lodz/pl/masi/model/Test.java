package com.it.p.lodz.pl.masi.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Test implements Serializable {
    private String name;
    private List<OpenQuestion> openQuestions = new ArrayList<>();
    private List<ChoiceQuestion> choiceQuestions = new ArrayList<>();
    private List<ScaleQuestion> scaleQuestions = new ArrayList<>();
    private List<NumericQuestion> numericQuestions = new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<OpenQuestion> getOpenQuestions() {
        return openQuestions;
    }

    public void setOpenQuestions(List<OpenQuestion> openQuestions) {
        this.openQuestions = openQuestions;
    }

    public List<ChoiceQuestion> getChoiceQuestions() {
        return choiceQuestions;
    }

    public void setChoiceQuestions(List<ChoiceQuestion> choiceQuestions) {
        this.choiceQuestions = choiceQuestions;
    }

    public List<ScaleQuestion> getScaleQuestions() {
        return scaleQuestions;
    }

    public void setScaleQuestions(List<ScaleQuestion> scaleQuestions) {
        this.scaleQuestions = scaleQuestions;
    }

    public List<NumericQuestion> getNumericQuestions() {
        return numericQuestions;
    }

    public void setNumericQuestions(List<NumericQuestion> numericQuestions) {
        this.numericQuestions = numericQuestions;
    }
}
