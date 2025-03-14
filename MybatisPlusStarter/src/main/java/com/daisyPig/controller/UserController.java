package com.daisyPig.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.daisyPig.common.Response;
import com.daisyPig.entity.User;
import com.daisyPig.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public Response<Boolean> save(@RequestBody User user) {
        return Response.success(userService.saveUser(user));
    }

    @DeleteMapping("/{id}")
    public Response<Boolean> delete(@PathVariable Long id) {
        return Response.success(userService.deleteUser(id));
    }

    @PutMapping
    public Response<Boolean> update(@RequestBody User user) {
        return Response.success(userService.updateUser(user));
    }

    @GetMapping("/{id}")
    public Response<User> getById(@PathVariable Long id) {
        return Response.success(userService.getById(id));
    }

    @DeleteMapping("/batch")
    public Response<Boolean> batchDelete(@RequestBody List<Long> ids) {
        return Response.success(userService.batchDeleteUser(ids));
    }

    @GetMapping("/page")
    public Response<IPage<User>> page(@RequestParam(defaultValue = "1") int current,
                                      @RequestParam(defaultValue = "10") int size,
                                      @RequestParam(required = false) String name,
                                      @RequestParam(required = false) Integer age,
                                      @RequestParam(required = false, defaultValue = "id") String sortField,
                                      @RequestParam(required = false, defaultValue = "asc") String sortOrder) {
        return Response.success(userService.page(current, size, name, age,sortField,sortOrder));
    }

    @GetMapping("/count")
    public Response<Long> countUser() {
        return Response.success(userService.countUser());
    }

}