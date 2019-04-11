package com.it.p.lodz.pl.masi.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Mark implements Serializable {
    private List<Integer> marks = new ArrayList<>();

    public List<Integer> getMarks() {
        return marks;
    }

    public void setMarks(List<Integer> marks) {
        this.marks = marks;
    }
}
