package com.it.p.lodz.pl.masi.dtos;

import com.it.p.lodz.pl.masi.model.Test;
import com.it.p.lodz.pl.masi.model.TestAnswer;

public class FullResolvedTestDto {
    private String id;
    private Test test;
    private TestAnswer answer;
    private String pointsMax;
    private String version;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Test getTest() {
        return test;
    }

    public void setTest(Test test) {
        this.test = test;
    }

    public TestAnswer getAnswer() {
        return answer;
    }

    public void setAnswer(TestAnswer answer) {
        this.answer = answer;
    }

    public String getPointsMax() {
        return pointsMax;
    }

    public void setPointsMax(String pointsMax) {
        this.pointsMax = pointsMax;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}
