package com.it.p.lodz.pl.masi.dtos;

import java.util.List;

public class MarkedResolvedTestDto {
    private String id;
    private List<Integer> mark;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Integer> getMark() {return mark;}

    public void setMark(List<Integer> mark) {this.mark = mark;}
}
