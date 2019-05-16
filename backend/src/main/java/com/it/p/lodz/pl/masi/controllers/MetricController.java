package com.it.p.lodz.pl.masi.controllers;

import com.it.p.lodz.pl.masi.dtos.MetricsDto;
import com.it.p.lodz.pl.masi.services.MetricService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
}
