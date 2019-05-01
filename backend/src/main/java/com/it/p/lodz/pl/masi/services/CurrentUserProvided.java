package com.it.p.lodz.pl.masi.services;

import com.it.p.lodz.pl.masi.entities.UserEntity;
import com.it.p.lodz.pl.masi.exceptions.UserNotFoundException;
import com.it.p.lodz.pl.masi.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CurrentUserProvided {

    private UserRepository userRepository;

    public CurrentUserProvided(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity getCurrentUserEntity() {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        Optional<UserEntity> userEntity = userRepository.findOneByEmail(email);
        return userEntity.orElseThrow(UserNotFoundException::new);
    }
}
