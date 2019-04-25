package com.it.p.lodz.pl.masi.dtos;

import java.util.List;

import com.it.p.lodz.pl.masi.model.Test;

public class ResolveTestDto {
    private List<String> answers;
    private Test test;
    private long testVersionId;
    private long candidateId;

    public List<String> getAnswers() {
        return answers;
    }

    public long getTestVersionId() {
        return testVersionId;
    }

    public void setTestVersionId(long testVersionId) {
        this.testVersionId = testVersionId;
    }

    public long getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(long candidateId) {
        this.candidateId = candidateId;
    }

    public Test getTest() {
        return test;
    }

    public void setTest(Test test) {
        this.test = test;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }
    
}