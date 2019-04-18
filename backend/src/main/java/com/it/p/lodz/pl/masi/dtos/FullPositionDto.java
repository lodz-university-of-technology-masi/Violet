package com.it.p.lodz.pl.masi.dtos;

public class FullPositionDto extends PositionDto {
    private Boolean isActive;
    private Long version;

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }
}
