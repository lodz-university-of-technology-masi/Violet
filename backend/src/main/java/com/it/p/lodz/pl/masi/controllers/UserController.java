package com.it.p.lodz.pl.masi.controllers;

import java.util.List;

import com.it.p.lodz.pl.masi.dtos.UserDto;
import com.it.p.lodz.pl.masi.dtos.UserEditDto;
import com.it.p.lodz.pl.masi.dtos.UserRedactorDto;
import com.it.p.lodz.pl.masi.services.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "${frontend.url}")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user/redactor/add")
    public HttpStatus addRedactor(@RequestBody UserRedactorDto userRedactorDto) {
        userService.addRedactor(userRedactorDto);
        return HttpStatus.ACCEPTED;
    }

    @GetMapping("/user/redactor")
    public List<UserDto> getAllRedactors() {
        return userService.getAllRedactors();
    }

    @GetMapping("/user/redactor/{id}")
    public UserDto getRedactor(@PathVariable long id) {return userService.getRedactorDto(id);}

    @DeleteMapping("/user/redactor/{id}")
    public void deleteRedactor(@PathVariable long id) {userService.deleteRedactor(id);}

    @PutMapping("/user/redactor/{id}")
    public void modifyRedactor(@PathVariable long id, @RequestBody UserEditDto dto) {userService.editUser(id, dto);}
}
