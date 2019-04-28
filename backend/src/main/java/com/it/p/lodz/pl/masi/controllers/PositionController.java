package com.it.p.lodz.pl.masi.controllers;

import java.util.List;

import com.it.p.lodz.pl.masi.dtos.BasePositionDto;
import com.it.p.lodz.pl.masi.dtos.FullPositionDto;
import com.it.p.lodz.pl.masi.dtos.PositionDto;
import com.it.p.lodz.pl.masi.services.PositionService;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/position/list")
    public List<FullPositionDto> getPositions() {
        return positionService.getAllPositions();
    }

    @PostMapping("/position/add")
    public HttpStatus addPosition(@RequestBody BasePositionDto positionDto) {
        positionService.addPosition(positionDto);
        return HttpStatus.ACCEPTED;
    }

    @PutMapping("/position/{id}")
    public void deactivate(@PathVariable long id, @RequestParam(value = "status") String status) {
        if (status.equals("deactivate")) {
            positionService.deactivatePosition(id);
        }
        if (status.equals("active")) {
            positionService.activatePosition(id);
        }
    }
}
