package com.it.p.lodz.pl.masi.services;

import com.it.p.lodz.pl.masi.dtos.UserDto;
import com.it.p.lodz.pl.masi.dtos.UserEditDto;
import com.it.p.lodz.pl.masi.entities.UserEntity;
import com.it.p.lodz.pl.masi.exceptions.EntityNotFoundException;
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

    public void deleteRedactor(long id) {
        var user = getRedactor(id);
        user.setDeleted(true);
        userRepository.save(user);
    }

    public void editUser(long id, UserEditDto dto) {
        var user = getRedactor(id);
        if(dto.getFirstName() != null) user.setFirstName(dto.getFirstName());
        if(dto.getLastName() != null) user.setLastName(dto.getLastName());
        if(dto.getEmail() != null) user.setEmail(dto.getEmail());
        userRepository.save(user);
    }

    private UserEntity getRedactor(long id) {
        var user = userRepository.findById(id);
        if(user.isEmpty()
                || user.get().isDeleted() == false
                || !user.get().getUserRolesById().stream().anyMatch(r -> r.getRoleByRoleId().getName().equals("redactor")))
            throw new EntityNotFoundException("Redactor with id " + id + " not found");

        return user.get();
    }
}
