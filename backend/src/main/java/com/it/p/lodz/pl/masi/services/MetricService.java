package com.it.p.lodz.pl.masi.services;

import com.it.p.lodz.pl.masi.dtos.MetricsDto;
import com.it.p.lodz.pl.masi.entities.UsabilityDataEntity;
import com.it.p.lodz.pl.masi.repositories.UsabilityDataRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
public class MetricService {
    private UsabilityDataRepository usabilityDataRepository;
    private ModelMapper mapper;
    private CurrentUserProvided currentUserProvided;

    public MetricService(UsabilityDataRepository usabilityDataRepository, ModelMapper mapper, CurrentUserProvided currentUserProvided) {
        this.usabilityDataRepository = usabilityDataRepository;
        this.mapper = mapper;
        this.currentUserProvided = currentUserProvided;
    }

    public void addMetrics(MetricsDto metricsDto, String remoteAddr) {
        UsabilityDataEntity usabilityDataEntity = new UsabilityDataEntity();
        this.mapper.map(metricsDto, usabilityDataEntity);

        usabilityDataEntity.setIp(remoteAddr);
        usabilityDataEntity.setUsername(this.getUsername(remoteAddr));
        usabilityDataEntity.setmId(this.countMeasurementId(usabilityDataEntity.getUsername()));
        usabilityDataEntity.setSavetime(new Timestamp(System.currentTimeMillis()));

        this.usabilityDataRepository.saveAndFlush(usabilityDataEntity);
    }

    private String getUsername(String remoteAddr) {
        if (!"anonymousUser".equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
            return this.currentUserProvided.getCurrentUserEntity().getEmail();
        } else {
            return "candidate" + remoteAddr;
        }
    }

    private Integer countMeasurementId(String username) {
        return this.usabilityDataRepository.getAllByUsername(username).size() + 1;
    }
}
