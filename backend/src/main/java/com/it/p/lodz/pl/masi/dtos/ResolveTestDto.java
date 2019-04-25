package com.it.p.lodz.pl.masi.dtos;

import java.util.List;

import com.it.p.lodz.pl.masi.model.Test;

public class ResolveTestDto {
    private List<String> answers;
    private EditResolveTestVersionDto test;
    private String candidateToken;

    public List<String> getAnswers() {
        return answers;
    }

    public String getCandidateToken() {
        return candidateToken;
    }

    public void setCandidateToken(String candidateToken) {
        this.candidateToken = candidateToken;
    }

    public EditResolveTestVersionDto getTest() {
        return test;
    }

    public void setTest(EditResolveTestVersionDto test) {
        this.test = test;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }
    
}