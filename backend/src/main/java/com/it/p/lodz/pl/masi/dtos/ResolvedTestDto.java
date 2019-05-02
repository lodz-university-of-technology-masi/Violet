package com.it.p.lodz.pl.masi.dtos;

public class ResolvedTestDto {
    private String id;
    private String testName;
    private String pointsSum;
    private String pointsMax;
    private String version;
    private String candidateByCandidateIdEmail;
    private String positionByPositionIdName;
    private String languageByLanguageIdName;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public String getPointsSum() {
        return pointsSum;
    }

    public void setPointsSum(String pointsSum) {
        this.pointsSum = pointsSum;
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

    public String getCandidateByCandidateIdEmail() {
        return candidateByCandidateIdEmail;
    }

    public void setCandidateByCandidateIdEmail(String candidateByCandidateIdEmail) {
        this.candidateByCandidateIdEmail = candidateByCandidateIdEmail;
    }

    public String getPositionByPositionIdName() {
        return positionByPositionIdName;
    }

    public void setPositionByPositionIdName(String positionByPositionIdName) {
        this.positionByPositionIdName = positionByPositionIdName;
    }

    public String getLanguageByLanguageIdName() {
        return languageByLanguageIdName;
    }

    public void setLanguageByLanguageIdName(String languageByLanguageIdName) {
        this.languageByLanguageIdName = languageByLanguageIdName;
    }
}
