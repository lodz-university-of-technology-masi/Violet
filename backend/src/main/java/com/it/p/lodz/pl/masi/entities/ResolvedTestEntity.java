package com.it.p.lodz.pl.masi.entities;

import com.it.p.lodz.pl.masi.model.Mark;
import com.it.p.lodz.pl.masi.model.Test;
import com.it.p.lodz.pl.masi.model.TestAnswer;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "resolved_test", schema = "public", catalog = "masi")
@TypeDefs({
        @TypeDef(name = "json", typeClass = JsonBinaryType.class)
})
public class ResolvedTestEntity {
    private long id;
    private Test test;
    private TestAnswer answer;
    private Mark mark;
    private Long pointsSum;
    private long pointsMax;
    private long version = 0;
    private UserEntity userByOwnerId;
    private CandidateEntity candidateByCandidateId;
    private PositionEntity positionByPositionId;
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
    @NotNull(message = "null_resolved_test")
    @Type(type = "json")
    public Test getTest() {
        return test;
    }

    public void setTest(Test test) {
        this.test = test;
    }

    @Basic
    @Column(name = "answer")
    @NotNull(message = "null_resolved_test_answer")
    @Type(type = "json")
    public TestAnswer getAnswer() {
        return answer;
    }

    public void setAnswer(TestAnswer answer) {
        this.answer = answer;
    }

    @Basic
    @Column(name = "mark")
    @Type(type = "json")
    public Mark getMark() {
        return mark;
    }

    public void setMark(Mark mark) {
        this.mark = mark;
    }

    @Basic
    @Column(name = "points_sum")
    public Long getPointsSum() {
        return pointsSum;
    }

    public void setPointsSum(Long pointsSum) {
        this.pointsSum = pointsSum;
    }

    @Basic
    @NotNull(message = "null_points_max")
    @Column(name = "points_max")
    public long getPointsMax() {
        return pointsMax;
    }

    public void setPointsMax(long pointsMax) {
        this.pointsMax = pointsMax;
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

        if (!(o instanceof ResolvedTestEntity)) {
            return false;
        }
        ResolvedTestEntity that = (ResolvedTestEntity) o;

        return new EqualsBuilder()
                .append(id, that.id)
                .append(pointsMax, that.pointsMax)
                .append(version, that.version)
                .append(test, that.test)
                .append(answer, that.answer)
                .append(mark, that.mark)
                .append(pointsSum, that.pointsSum)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .append(test)
                .append(answer)
                .append(mark)
                .append(pointsSum)
                .append(pointsMax)
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
    @JoinColumn(name = "candidate_id", referencedColumnName = "id", nullable = false)
    public CandidateEntity getCandidateByCandidateId() {
        return candidateByCandidateId;
    }

    public void setCandidateByCandidateId(CandidateEntity candidateByCandidateId) {
        this.candidateByCandidateId = candidateByCandidateId;
    }

    @ManyToOne
    @JoinColumn(name = "position_id", referencedColumnName = "id", nullable = false)
    public PositionEntity getPositionByPositionId() {
        return positionByPositionId;
    }

    public void setPositionByPositionId(PositionEntity positionByPositionId) {
        this.positionByPositionId = positionByPositionId;
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
