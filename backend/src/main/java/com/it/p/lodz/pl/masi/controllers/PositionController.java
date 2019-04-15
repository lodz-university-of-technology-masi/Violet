package com.it.p.lodz.pl.masi.controllers;

import com.it.p.lodz.pl.masi.dtos.PositionDto;
import com.it.p.lodz.pl.masi.services.PositionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PositionController {
    private PositionService positionService;

    public PositionController(PositionService positionService) {
        this.positionService = positionService;
    }

    @GetMapping("/candidate/positions")
    public List<PositionDto> getActivePositions() {
        return positionService.getAllActivePositions();
    }

    @GetMapping("/candidate/allPositions")
    public List<PositionDto> getPositions() {
        return positionService.getAllPositions();
    }
}
