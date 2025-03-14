package com.daisyPig.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.daisyPig.entity.User;

import java.util.List;

public interface UserService extends IService<User> {
    boolean updateUser(User user);

    boolean saveUser(User user);

    boolean deleteUser(Long id);

    boolean batchDeleteUser(List<Long> ids);

    User getById(Long id);

    long countUser();

    Page<User> page(int current, int size, String name, Integer age,String sortField,String sortOrder);

}