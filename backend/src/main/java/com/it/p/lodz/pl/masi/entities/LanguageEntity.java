package com.it.p.lodz.pl.masi.entities;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Collection;

@Entity
@Table(name = "language", schema = "public", catalog = "masi")
public class LanguageEntity {
    private long id;
    private String name;
    private String code;
    private long version = 0;
    private Collection<CandidateEntity> candidatesById;
    private Collection<ResolvedTestEntity> resolvedTestsById;
    private Collection<TestVersionEntity> testVersionsById;

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
    @NotNull(message = "null_language_name")
    @Size(min=3, max=32, message = "wrong_language_name_size")
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @NotNull(message = "null_language_code")
    @Size(min=2, max=4, message = "wrong_language_code_size")
    @Column(name = "code")
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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
        LanguageEntity that = (LanguageEntity) o;

        return new EqualsBuilder()
                .append(id, that.id)
                .append(version, that.version)
                .append(name, that.name)
                .append(code, that.code)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .append(name)
                .append(version)
                .append(code)
                .toHashCode();
    }

    @OneToMany(mappedBy = "languageByLanguageId")
    public Collection<CandidateEntity> getCandidatesById() {
        return candidatesById;
    }

    public void setCandidatesById(Collection<CandidateEntity> candidatesById) {
        this.candidatesById = candidatesById;
    }

    @OneToMany(mappedBy = "languageByLanguageId")
    public Collection<ResolvedTestEntity> getResolvedTestsById() {
        return resolvedTestsById;
    }

    public void setResolvedTestsById(Collection<ResolvedTestEntity> resolvedTestsById) {
        this.resolvedTestsById = resolvedTestsById;
    }

    @OneToMany(mappedBy = "languageByLanguageId")
    public Collection<TestVersionEntity> getTestVersionsById() {
        return testVersionsById;
    }

    public void setTestVersionsById(Collection<TestVersionEntity> testVersionsById) {
        this.testVersionsById = testVersionsById;
    }
}
