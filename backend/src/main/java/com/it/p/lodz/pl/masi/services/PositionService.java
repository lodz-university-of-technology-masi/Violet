package com.it.p.lodz.pl.masi.services;

import com.it.p.lodz.pl.masi.dtos.BasePositionDto;
import com.it.p.lodz.pl.masi.dtos.FullPositionDto;
import com.it.p.lodz.pl.masi.dtos.PositionDto;
import com.it.p.lodz.pl.masi.entities.PositionEntity;
import com.it.p.lodz.pl.masi.repositories.PositionRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PositionService {
    private PositionRepository positionRepository;
    private ModelMapper mapper;

    public PositionService(PositionRepository positionRepository, ModelMapper mapper) {
        this.positionRepository = positionRepository;
        this.mapper = mapper;
    }

    public List<PositionDto> getAllActivePositions() {
        var positions = positionRepository.findAllByActiveTrue();
        var listType = new TypeToken<List<PositionDto>>(){}.getType();
        return mapper.map(positions, listType);
    }

    public List<FullPositionDto> getAllPositions() {
        var positions = positionRepository.findAll();
        var listType = new TypeToken<List<FullPositionDto>>(){}.getType();
        return mapper.map(positions, listType);
    }

    public void addPosition(BasePositionDto positionDto) {
        PositionEntity positionEntity = new PositionEntity();
        positionEntity.setName(positionDto.getName());
        this.positionRepository.saveAndFlush(positionEntity);
    }

    public void activatePosition(Long positionId){
        var value = positionRepository.findById(positionId);
        if(value.isPresent()){
            PositionEntity position = value.get();
            position.setActive(true);
            this.positionRepository.saveAndFlush(position);
        }
    }
    public void deactivatePosition(Long positionId){
        var value = positionRepository.findById(positionId);
        if(value.isPresent()){
            PositionEntity position = value.get();
            position.setActive(false);
            this.positionRepository.saveAndFlush(position);
        }
    }
}
