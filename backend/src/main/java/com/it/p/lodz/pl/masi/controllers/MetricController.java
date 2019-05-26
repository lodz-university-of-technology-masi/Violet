package com.it.p.lodz.pl.masi.controllers;

import com.it.p.lodz.pl.masi.dtos.MetricsDto;
import com.it.p.lodz.pl.masi.services.MetricService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

@RestController
public class MetricController {

    private MetricService metricService;

    public MetricController(MetricService metricService) {
        this.metricService = metricService;
    }

    @PostMapping("/metric/add")
    public void addMetrics(@RequestBody MetricsDto metricsDto, HttpServletRequest request) {
        this.metricService.addMetrics(metricsDto, request.getRemoteAddr());
    }

    @PostMapping("/metric/upload/screenshot")
    public void handleScreenshotUpload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        this.metricService.saveScreenshot(file, request.getRemoteAddr(), request.getServletContext());
    }
}
