package com.it.p.lodz.pl.masi.entities;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Entity
@Table(name = "usability_data", schema = "public", catalog = "masi")
public class UsabilityDataEntity {
    private long id;
    private String ip;
    private String browser;
    private String username;
    private int mId;
    private Timestamp savetime;
    private int resW;
    private int resH;
    private int mc;
    private Double time;
    private Double dist;
    private boolean fail = false;
    private int error = 0;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Basic
    @NotNull(message = "null_ip")
    @Column(name = "ip")
    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @Basic
    @NotNull(message = "null_browser_name")
    @Column(name = "browser")
    public String getBrowser() {
        return browser;
    }

    public void setBrowser(String browser) {
        this.browser = browser;
    }

    @Basic
    @NotNull(message = "null_username")
    @Column(name = "username")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @NotNull(message = "null_m_id")
    @Column(name = "m_id")
    public int getmId() {
        return mId;
    }

    public void setmId(int mId) {
        this.mId = mId;
    }

    @Basic
    @NotNull(message = "null_savetime")
    @Column(name = "savetime")
    public Timestamp getSavetime() {
        return savetime;
    }

    public void setSavetime(Timestamp savetime) {
        this.savetime = savetime;
    }

    @Basic
    @NotNull(message = "null_res_w")
    @Column(name = "res_w")
    public int getResW() {
        return resW;
    }

    public void setResW(int resW) {
        this.resW = resW;
    }

    @Basic
    @NotNull(message = "null_res_h")
    @Column(name = "res_h")
    public int getResH() {
        return resH;
    }

    public void setResH(int resH) {
        this.resH = resH;
    }

    @Basic
    @NotNull(message = "null_mc")
    @Column(name = "mc")
    public int getMc() {
        return mc;
    }

    public void setMc(int mc) {
        this.mc = mc;
    }

    @Basic
    @NotNull(message = "null_time")
    @Column(name = "time")
    public Double getTime() {
        return time;
    }

    public void setTime(Double time) {
        this.time = time;
    }

    @Basic
    @NotNull(message = "null_dist")
    @Column(name = "dist")
    public Double getDist() {
        return dist;
    }

    public void setDist(Double dist) {
        this.dist = dist;
    }

    @Basic
    @NotNull(message = "null_fail")
    @Column(name = "fail")
    public boolean isFail() {
        return fail;
    }

    public void setFail(boolean fail) {
        this.fail = fail;
    }

    @Basic
    @NotNull(message = "null_error")
    @Column(name = "error")
    public int getError() {
        return error;
    }

    public void setError(int error) {
        this.error = error;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) return false;
        UsabilityDataEntity that = (UsabilityDataEntity) o;

        return new EqualsBuilder()
                .append(id, that.id)
                .append(mId, that.mId)
                .append(resW, that.resW)
                .append(resH, that.resH)
                .append(mc, that.mc)
                .append(fail, that.fail)
                .append(error, that.error)
                .append(ip, that.ip)
                .append(browser, that.browser)
                .append(username, that.username)
                .append(savetime, that.savetime)
                .append(time, that.time)
                .append(dist, that.dist)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .append(ip)
                .append(browser)
                .append(username)
                .append(mId)
                .append(savetime)
                .append(resW)
                .append(resH)
                .append(mc)
                .append(time)
                .append(dist)
                .append(fail)
                .append(error)
                .toHashCode();
    }
}
