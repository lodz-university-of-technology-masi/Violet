package com.it.p.lodz.pl.masi.dtos;

import com.it.p.lodz.pl.masi.model.Test;

public class ModifyTestVersionDto {
    private String versionId;
    private Test test;
    private String version;

    public String getVersionId() {
        return versionId;
    }

    public void setVersionId(String versionId) {
        this.versionId = versionId;
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
