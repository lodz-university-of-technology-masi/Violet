package com.it.p.lodz.pl.masi.dtos;

public class UserRedactorDto extends UserEditDto {
    private String password;
    private String secondPassword;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSecondPassword() {
        return secondPassword;
    }

    public void setSecondPassword(String secondPassword) {
        this.secondPassword = secondPassword;
    }
}
