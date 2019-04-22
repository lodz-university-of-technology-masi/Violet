package com.it.p.lodz.pl.masi.dtos;

import com.it.p.lodz.pl.masi.model.Test;

public class EditResolveTestVersionDto {
    private String id;
    private Test test;
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

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}
