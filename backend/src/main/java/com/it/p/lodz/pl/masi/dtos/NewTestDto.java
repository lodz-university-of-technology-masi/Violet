package com.it.p.lodz.pl.masi.dtos;

import com.it.p.lodz.pl.masi.model.Test;

public class NewTestDto {
    private String languageId;
    private Test test;

    public String getLanguageId() {
        return languageId;
    }

    public void setLanguageId(String languageId) {
        this.languageId = languageId;
    }

    public Test getTest() {
        return test;
    }

    public void setTest(Test test) {
        this.test = test;
    }
}
