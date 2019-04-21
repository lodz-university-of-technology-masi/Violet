package com.it.p.lodz.pl.masi.controllers;

import com.it.p.lodz.pl.masi.dtos.UserDto;
import com.it.p.lodz.pl.masi.dtos.UserEditDto;
import com.it.p.lodz.pl.masi.services.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/redactor")
    public List<UserDto> getAllRedactors() {
        return userService.getAllRedactors();
    }

    @DeleteMapping("/user/redactor/{id}")
    public void deleteRedactor(@PathVariable long id) {userService.deleteRedactor(id);}

    @PutMapping("/user/redactor/{id}")
    public void modifyRedactor(@PathVariable long id, @RequestBody UserEditDto dto) {userService.editUser(id, dto);}
}
