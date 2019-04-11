package com.it.p.lodz.pl.masi.entities;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "candidate", schema = "public", catalog = "masi")
public class CandidateEntity {
    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private long version = 0;
    private LanguageEntity languageByLanguageId;
    private PositionEntity positionByPositionId;
    private Collection<CandidateTokenEntity> candidateTokensById;
    private Collection<ResolvedTestEntity> resolvedTestsById;

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
    @Column(name = "first_name")
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Basic
    @Column(name = "last_name")
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Basic
    @Column(name = "email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
        CandidateEntity that = (CandidateEntity) o;

        return new EqualsBuilder()
                .append(id, that.id)
                .append(version, that.version)
                .append(firstName, that.firstName)
                .append(lastName, that.lastName)
                .append(email, that.email)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .append(firstName)
                .append(lastName)
                .append(email)
                .append(version)
                .toHashCode();
    }

    @ManyToOne
    @JoinColumn(name = "language_id", referencedColumnName = "id", nullable = false)
    public LanguageEntity getLanguageByLanguageId() {
        return languageByLanguageId;
    }

    public void setLanguageByLanguageId(LanguageEntity languageByLanguageId) {
        this.languageByLanguageId = languageByLanguageId;
    }

    @ManyToOne
    @JoinColumn(name = "position_id", referencedColumnName = "id", nullable = false)
    public PositionEntity getPositionByPositionId() {
        return positionByPositionId;
    }

    public void setPositionByPositionId(PositionEntity positionByPositionId) {
        this.positionByPositionId = positionByPositionId;
    }

    @OneToMany(mappedBy = "candidateByCandidateId")
    public Collection<CandidateTokenEntity> getCandidateTokensById() {
        return candidateTokensById;
    }

    public void setCandidateTokensById(Collection<CandidateTokenEntity> candidateTokensById) {
        this.candidateTokensById = candidateTokensById;
    }

    @OneToMany(mappedBy = "candidateByCandidateId")
    public Collection<ResolvedTestEntity> getResolvedTestsById() {
        return resolvedTestsById;
    }

    public void setResolvedTestsById(Collection<ResolvedTestEntity> resolvedTestsById) {
        this.resolvedTestsById = resolvedTestsById;
    }
}
