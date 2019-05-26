package com.it.p.lodz.pl.masi.controllers;

import com.it.p.lodz.pl.masi.dtos.UserDto;
import com.it.p.lodz.pl.masi.dtos.UserEditDto;
import com.it.p.lodz.pl.masi.dtos.UserIdentityDto;
import com.it.p.lodz.pl.masi.dtos.UserRedactorDto;
import com.it.p.lodz.pl.masi.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

@RestController
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

    @GetMapping("user/ip")
    public String getUserIp(HttpServletRequest request) {
        return request.getRemoteAddr();
    }

    @GetMapping("/user/redactor")
    public List<UserDto> getAllRedactors() {
        return userService.getAllRedactors();
    }

    @GetMapping("/user/redactor/{id}")
    public UserDto getRedactor(@PathVariable long id) {return userService.getRedactorDto(id);}

    @DeleteMapping("/user/redactor/{id}")
    public void deleteRedactor(@PathVariable long id) {userService.deleteRedactor(id);}

    @GetMapping("/user/identity")
    public UserIdentityDto getMyIdentity() {
        return userService.getMyIdentity();
    }

    @PutMapping("/user/redactor/{id}")
    public void modifyRedactor(@PathVariable long id, @RequestBody UserEditDto dto) {userService.editUser(id, dto);}
}
