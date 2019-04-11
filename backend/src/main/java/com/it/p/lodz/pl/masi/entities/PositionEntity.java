package com.it.p.lodz.pl.masi.entities;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "position", schema = "public", catalog = "masi")
public class PositionEntity {
    private long id;
    private String name;
    private boolean isActive = true;
    private long version = 0;
    private Collection<CandidateEntity> candidatesById;
    private Collection<ResolvedTestEntity> resolvedTestsById;
    private Collection<TestEntity> testsById;

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
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
        PositionEntity that = (PositionEntity) o;

        return new EqualsBuilder()
                .append(id, that.id)
                .append(isActive, that.isActive)
                .append(version, that.version)
                .append(name, that.name)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .append(name)
                .append(isActive)
                .append(version)
                .toHashCode();
    }

    @OneToMany(mappedBy = "positionByPositionId")
    public Collection<CandidateEntity> getCandidatesById() {
        return candidatesById;
    }

    public void setCandidatesById(Collection<CandidateEntity> candidatesById) {
        this.candidatesById = candidatesById;
    }

    @OneToMany(mappedBy = "positionByPositionId")
    public Collection<ResolvedTestEntity> getResolvedTestsById() {
        return resolvedTestsById;
    }

    public void setResolvedTestsById(Collection<ResolvedTestEntity> resolvedTestsById) {
        this.resolvedTestsById = resolvedTestsById;
    }

    @OneToMany(mappedBy = "positionByPositionId")
    public Collection<TestEntity> getTestsById() {
        return testsById;
    }

    public void setTestsById(Collection<TestEntity> testsById) {
        this.testsById = testsById;
    }
}
