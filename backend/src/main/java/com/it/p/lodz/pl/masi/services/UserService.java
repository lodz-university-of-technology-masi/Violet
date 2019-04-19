package com.it.p.lodz.pl.masi.services;

import com.it.p.lodz.pl.masi.dtos.UserDto;
import com.it.p.lodz.pl.masi.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserService {
    private UserRepository userRepository;
    private ModelMapper mapper;

    public UserService(UserRepository userRepository, ModelMapper mapper) {
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    public List<UserDto> getAllRedactors() {
        var users = userRepository.findAllRedactors();
        var listType = new TypeToken<List<UserDto>>(){}.getType();
        return mapper.map(users, listType);
    }
}