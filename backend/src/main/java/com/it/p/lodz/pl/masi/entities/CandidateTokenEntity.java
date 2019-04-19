package com.it.p.lodz.pl.masi.entities;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

@Entity
@Table(name = "candidate_token", schema = "public", catalog = "masi")
public class CandidateTokenEntity {
    private long id;
    private String token;
    private boolean isActive = true;
    private Timestamp expireDate;
    private long version = 0;
    private CandidateEntity candidateByCandidateId;

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
    @NotNull(message = "null_candidate_token")
    @Size(min=2, max=128, message = "wrong_candidate_token_size")
    @Column(name = "token")
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Basic
    @Column(name = "is_active")
    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    @Basic
    @NotNull(message = "null_candidate_token_expire_date")
    @Column(name = "expire_date")
    public Timestamp getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(Timestamp expireDate) {
        this.expireDate = expireDate;
    }

    @Basic
    @Column(name = "version")
    public long getVersion() {
        return version;
    }

    public void setVersion(long version) {
        this.version = version;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) return false;
        CandidateTokenEntity that = (CandidateTokenEntity) o;

        return new EqualsBuilder()
                .append(id, that.id)
                .append(isActive, that.isActive)
                .append(version, that.version)
                .append(token, that.token)
                .append(expireDate, that.expireDate)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .append(token)
                .append(isActive)
                .append(expireDate)
                .append(version)
                .toHashCode();
    }

    @ManyToOne
    @JoinColumn(name = "candidate_id", referencedColumnName = "id", nullable = false)
    public CandidateEntity getCandidateByCandidateId() {
        return candidateByCandidateId;
    }

    public void setCandidateByCandidateId(CandidateEntity candidateByCandidateId) {
        this.candidateByCandidateId = candidateByCandidateId;
    }
}
