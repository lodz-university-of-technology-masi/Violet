package com.it.p.lodz.pl.masi.dtos;

import java.util.List;

public class TestDto {
    private String id;
    private List<TestVersionDto> testVersions;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<TestVersionDto> getTestVersions() {
        return testVersions;
    }

    public void setTestVersions(List<TestVersionDto> versions) {
        this.testVersions = versions;
    }
}
