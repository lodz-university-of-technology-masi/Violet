package com.it.p.lodz.pl.masi.entities;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Collection;

@Entity
@Table(name = "user", schema = "public", catalog = "masi")
public class UserEntity {
    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private boolean isDeleted = false;
    private long version = 0;
    private Collection<ResolvedTestEntity> resolvedTestsById;
    private Collection<TestEntity> testsById;
    private Collection<UserRoleEntity> userRolesById;

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
    @NotNull(message = "null_user_first_name")
    @Size(min=2, max=32, message = "wrong_user_first_name_size")
    @Pattern(regexp = "[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+([ '-][a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)*", message = "wrong_user_first_name")
    @Column(name = "first_name")
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Basic
    @NotNull(message = "null_user_last_name")
    @Size(min=2, max=32, message = "wrong_user_last_name_size")
    @Pattern(regexp = "[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+([ '-][a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)*", message = "wrong_user_last_name")
    @Column(name = "last_name")
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Basic
    @NotNull(message = "null_user_email_name")
    @Size(min=5, max=64, message = "wrong_user_email_size")
    @Pattern(regexp = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message = "wrong_user_email")
    @Column(name = "email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @NotNull(message = "null_user_password")
    @Size(min=16, max=64, message = "wrong_user_password_size")
    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
        UserEntity that = (UserEntity) o;

        return new EqualsBuilder()
                .append(id, that.id)
                .append(isDeleted, that.isDeleted)
                .append(version, that.version)
                .append(firstName, that.firstName)
                .append(lastName, that.lastName)
                .append(email, that.email)
                .append(password, that.password)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .append(firstName)
                .append(lastName)
                .append(email)
                .append(password)
                .append(isDeleted)
                .append(version)
                .toHashCode();
    }

    @OneToMany(mappedBy = "userByOwnerId")
    public Collection<ResolvedTestEntity> getResolvedTestsById() {
        return resolvedTestsById;
    }

    public void setResolvedTestsById(Collection<ResolvedTestEntity> resolvedTestsById) {
        this.resolvedTestsById = resolvedTestsById;
    }

    @OneToMany(mappedBy = "userByOwnerId")
    public Collection<TestEntity> getTestsById() {
        return testsById;
    }

    public void setTestsById(Collection<TestEntity> testsById) {
        this.testsById = testsById;
    }

    @OneToMany(mappedBy = "userByUserId")
    public Collection<UserRoleEntity> getUserRolesById() {
        return userRolesById;
    }

    public void setUserRolesById(Collection<UserRoleEntity> userRolesById) {
        this.userRolesById = userRolesById;
    }
}
