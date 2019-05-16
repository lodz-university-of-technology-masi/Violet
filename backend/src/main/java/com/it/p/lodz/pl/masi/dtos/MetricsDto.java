package com.it.p.lodz.pl.masi.dtos;

public class MetricsDto {
    private String browser;
    private String resW;
    private String resH;
    private String mc;
    private String time;
    private String dist;
    private Boolean fail;

    public String getBrowser() {
        return browser;
    }

    public void setBrowser(String browser) {
        this.browser = browser;
    }

    public String getResW() {
        return resW;
    }

    public void setResW(String resW) {
        this.resW = resW;
    }

    public String getResH() {
        return resH;
    }

    public void setResH(String resH) {
        this.resH = resH;
    }

    public String getMc() {
        return mc;
    }

    public void setMc(String mc) {
        this.mc = mc;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDist() {
        return dist;
    }

    public void setDist(String dist) {
        this.dist = dist;
    }

    public Boolean getFail() {
        return fail;
    }

    public void setFail(Boolean fail) {
        this.fail = fail;
    }
}
