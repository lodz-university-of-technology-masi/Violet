package com.it.p.lodz.pl.masi.entities;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "test", schema = "public", catalog = "masi")
public class TestEntity {
    private long id;
    private boolean isActive = true;
    private boolean isDeleted = false;
    private long version = 0;
    private UserEntity userByOwnerId;
    private PositionEntity positionByPositionId;
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
        TestEntity that = (TestEntity) o;

        return new EqualsBuilder()
                .append(id, that.id)
                .append(isActive, that.isActive)
                .append(isDeleted, that.isDeleted)
                .append(version, that.version)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .append(isActive)
                .append(isDeleted)
                .append(version)
                .toHashCode();
    }

    @ManyToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "id", nullable = false)
    public UserEntity getUserByOwnerId() {
        return userByOwnerId;
    }

    public void setUserByOwnerId(UserEntity userByOwnerId) {
        this.userByOwnerId = userByOwnerId;
    }

    @ManyToOne
    @JoinColumn(name = "position_id", referencedColumnName = "id")
    public PositionEntity getPositionByPositionId() {
        return positionByPositionId;
    }

    public void setPositionByPositionId(PositionEntity positionByPositionId) {
        this.positionByPositionId = positionByPositionId;
    }

    @OneToMany(mappedBy = "testByTestId")
    public Collection<TestVersionEntity> getTestVersionsById() {
        return testVersionsById;
    }

    public void setTestVersionsById(Collection<TestVersionEntity> testVersionsById) {
        this.testVersionsById = testVersionsById;
    }
}
