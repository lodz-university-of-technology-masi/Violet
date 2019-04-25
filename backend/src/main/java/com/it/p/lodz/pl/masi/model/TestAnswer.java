package com.it.p.lodz.pl.masi.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class TestAnswer implements Serializable {
    private List<String> testAnswers = new ArrayList<>();

    public List<String> getTestAnswers() {
        return testAnswers;
    }

    public void setTestAnswers(List<String> testAnswers) {
        this.testAnswers = testAnswers;
    }
}
