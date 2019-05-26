package com.it.p.lodz.pl.masi.services;

import com.it.p.lodz.pl.masi.dtos.MetricsDto;
import com.it.p.lodz.pl.masi.entities.UsabilityDataEntity;
import com.it.p.lodz.pl.masi.repositories.UsabilityDataRepository;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;

@Component
public class MetricService {

    private static final Log LOG = LogFactory.getLog(MetricService.class);

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

    public void saveScreenshot(MultipartFile file, String remoteAddr, ServletContext serverPath) {
        if (!file.isEmpty()) {
            try {
                String uploadsDir = "/uploads/";
                String realPathToUploads = serverPath.getRealPath(uploadsDir);

                if (!new File(realPathToUploads).exists()) {
                    new File(realPathToUploads).mkdir();
                }

                String filePath = realPathToUploads + createFileName(remoteAddr)  + "_" + file.getOriginalFilename();
                File dest = new File(filePath);
                file.transferTo(dest);

                LOG.info("Screenshot saved in " + dest.toPath().toString());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private String createFileName(String remoteAddr) {
        if (!"anonymousUser".equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
            return this.currentUserProvided.getCurrentUserEntity().getEmail() + remoteAddr;
        } else {
            return "candidate" + remoteAddr;
        }
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
