package com.it.p.lodz.pl.masi.services;

import com.it.p.lodz.pl.masi.dtos.UserDto;
import com.it.p.lodz.pl.masi.dtos.UserEditDto;
import com.it.p.lodz.pl.masi.dtos.UserRedactorDto;
import com.it.p.lodz.pl.masi.entities.RoleEntity;
import com.it.p.lodz.pl.masi.entities.UserEntity;
import com.it.p.lodz.pl.masi.entities.UserRoleEntity;
import com.it.p.lodz.pl.masi.exceptions.RedactorNotFoundException;
import com.it.p.lodz.pl.masi.repositories.RoleRepository;
import com.it.p.lodz.pl.masi.repositories.UserRepository;
import com.it.p.lodz.pl.masi.repositories.UserRoleRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private UserRoleRepository userRoleRepository;
    private ModelMapper mapper;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, ModelMapper mapper,
                       UserRoleRepository userRoleRepository) {
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
    }

    public List<UserDto> getAllRedactors() {
        var users = userRepository.findAllRedactors();
        var listType = new TypeToken<List<UserDto>>(){}.getType();
        return mapper.map(users, listType);
    }

    public void addRedactor(UserRedactorDto userRedactorDto) {
        UserEntity userEntity = new UserEntity();
        userEntity.setFirstName(userRedactorDto.getFirstName());
        userEntity.setLastName(userRedactorDto.getLastName());
        userEntity.setEmail(userRedactorDto.getEmail());
        userEntity.setPassword(userRedactorDto.getPassword());
        this.userRepository.saveAndFlush(userEntity);
        setRedactor(userEntity);
    }

    public void deleteRedactor(long id) {
        var user = getRedactor(id);
        user.setDeleted(true);
        userRepository.saveAndFlush(user);
    }

    public void editUser(long id, UserEditDto dto) {
        var user = getRedactor(id);
        if(dto.getFirstName() != null) user.setFirstName(dto.getFirstName());
        if(dto.getLastName() != null) user.setLastName(dto.getLastName());
        if(dto.getEmail() != null) user.setEmail(dto.getEmail());
        userRepository.saveAndFlush(user);
    }

    private UserEntity getRedactor(long id) {
        var user = userRepository.findOneByIdAndDeletedFalse(id);
        RoleEntity redactorRole = roleRepository.getOneByName("redactor");
        if (user == null || user.getUserRolesById().stream().noneMatch(r -> r.getRoleByRoleId() == redactorRole)) {
            throw new RedactorNotFoundException();
        }
        return user;
    }

    public UserDto getRedactorDto(long id) {
        var user = getRedactor(id);
        var type = new TypeToken<UserDto>(){}.getType();
        return mapper.map(user, type);
    }

    private void setRedactor(UserEntity userEntity) {
        UserRoleEntity userRoleEntity = new UserRoleEntity();
        RoleEntity redactorRole = roleRepository.getOneByName("redactor");
        userRoleEntity.setRoleByRoleId(redactorRole);
        userRoleEntity.setUserByUserId(userEntity);
        this.userRoleRepository.saveAndFlush(userRoleEntity);
    }
}
