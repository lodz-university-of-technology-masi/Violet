package com.it.p.lodz.pl.masi.controllers;

import com.it.p.lodz.pl.masi.dtos.BasePositionDto;
import com.it.p.lodz.pl.masi.dtos.FullPositionDto;
import com.it.p.lodz.pl.masi.dtos.PositionDto;
import com.it.p.lodz.pl.masi.services.PositionService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PositionController {
    private PositionService positionService;

    public PositionController(PositionService positionService) {
        this.positionService = positionService;
    }

    @GetMapping("/candidate/positions")
    public List<PositionDto> getActivePositions() {
        return positionService.getAllActivePositions();
    }

    @GetMapping("/position/list")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<FullPositionDto> getPositions() {
        return positionService.getAllPositions();
    }

    @PostMapping("/position/add")
    public HttpStatus addPosition(@RequestBody BasePositionDto positionDto) {
        positionService.addPosition(positionDto);
        return HttpStatus.ACCEPTED;
    }
}
