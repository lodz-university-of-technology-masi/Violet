package com.it.p.lodz.pl.masi.entities;

import com.it.p.lodz.pl.masi.model.Test;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import javax.persistence.*;

@Entity
@Table(name = "test_version", schema = "public", catalog = "masi")
@TypeDefs({
        @TypeDef(name = "json", typeClass = JsonBinaryType.class)
})
public class TestVersionEntity {
    private long id;
    private Test test;
    private boolean isActive = true;
    private boolean isDeleted = false;
    private long version = 0;
    private TestEntity testByTestId;
    private LanguageEntity languageByLanguageId;

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
    @Column(name = "test")
    @Type(type = "json")
    public Test getTest() {
        return test;
    }

    public void setTest(Test test) {
        this.test = test;
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
    @Column(name = "is_deleted")
    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
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
        TestVersionEntity that = (TestVersionEntity) o;

        return new EqualsBuilder()
                .append(id, that.id)
                .append(isActive, that.isActive)
                .append(isDeleted, that.isDeleted)
                .append(version, that.version)
                .append(test, that.test)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .append(test)
                .append(isActive)
                .append(isDeleted)
                .append(version)
                .toHashCode();
    }

    @ManyToOne
    @JoinColumn(name = "test_id", referencedColumnName = "id", nullable = false)
    public TestEntity getTestByTestId() {
        return testByTestId;
    }

    public void setTestByTestId(TestEntity testByTestId) {
        this.testByTestId = testByTestId;
    }

    @ManyToOne
    @JoinColumn(name = "language_id", referencedColumnName = "id", nullable = false)
    public LanguageEntity getLanguageByLanguageId() {
        return languageByLanguageId;
    }

    public void setLanguageByLanguageId(LanguageEntity languageByLanguageId) {
        this.languageByLanguageId = languageByLanguageId;
    }
}
