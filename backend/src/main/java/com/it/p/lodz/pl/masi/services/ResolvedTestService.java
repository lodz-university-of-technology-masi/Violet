package com.it.p.lodz.pl.masi.services;

import com.it.p.lodz.pl.masi.dtos.FullResolvedTestDto;
import com.it.p.lodz.pl.masi.dtos.ResolvedTestDto;
import com.it.p.lodz.pl.masi.entities.ResolvedTestEntity;
import com.it.p.lodz.pl.masi.exceptions.ResolvedTestNotFoundException;
import com.it.p.lodz.pl.masi.repositories.ResolvedTestRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;
import java.util.List;

@Component
public class ResolvedTestService {

    private ResolvedTestRepository resolvedTestRepository;
    private ModelMapper modelMapper;
    private CurrentUserProvided currentUserProvided;

    public ResolvedTestService(ResolvedTestRepository resolvedTestRepository, ModelMapper modelMapper, CurrentUserProvided currentUserProvided) {
        this.resolvedTestRepository = resolvedTestRepository;
        this.modelMapper = modelMapper;
        this.currentUserProvided = currentUserProvided;
    }


    public List<ResolvedTestDto> getAllResolvedTestsForUser() {
        List<ResolvedTestEntity> tests = resolvedTestRepository.getAllByUserByOwnerId(currentUserProvided.getCurrentUserEntity());
        Type listType = new TypeToken<List<ResolvedTestDto>>() {
        }.getType();
        return modelMapper.map(tests, listType);
    }

    public FullResolvedTestDto getOwnResolvedTestById(Long id) {
        return resolvedTestRepository
                    .findOneByIdAndUserByOwnerId(id, currentUserProvided.getCurrentUserEntity())
                    .map($ -> modelMapper.map($, FullResolvedTestDto.class))
                    .orElseThrow(ResolvedTestNotFoundException::new);
    }
}
