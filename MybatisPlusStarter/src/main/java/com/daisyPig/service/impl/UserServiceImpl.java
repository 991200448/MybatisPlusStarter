package com.daisyPig.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.daisyPig.entity.User;
import com.daisyPig.mapper.UserMapper;
import com.daisyPig.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public boolean updateUser(User user) {
        // 根据用户 ID 查询用户信息
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id", user.getId());
        User dbUser = this.getOne(queryWrapper);

        if (dbUser != null) {
            // 修改用户信息
            dbUser.setName(user.getName());
            dbUser.setAge(user.getAge());
            // 调用更新方法
            return this.updateById(dbUser);
        }
        return false;
    }

    @Override
    public boolean saveUser(User user) {
        return userMapper.insert(user) > 0;
    }

    @Override
    public boolean deleteUser(Long id) {
        return userMapper.deleteById(id) > 0;
    }

    @Override
    public boolean batchDeleteUser(List<Long> ids) {
        return userMapper.deleteByIds(ids) > 0;
    }

    @Override
    public User getById(Long id) {
        return userMapper.selectById(id);
    }

    @Override
    public long countUser() {
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        //查询总数，deleted为0的记录
        queryWrapper.eq(User::getDeleted, 0);
        return userMapper.selectCount(queryWrapper);
    }

    @Override
    public Page<User> page(int current, int size, String name, Integer age, String sortField, String sortOrder) {
        Page<User> page = new Page<>(current, size);
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        if (name != null && !name.isEmpty()) {
            queryWrapper.like("name", name);
        }
        if (age != null) {
            queryWrapper.eq("age", age);
        }
        if ("desc".equalsIgnoreCase(sortOrder)) {
            queryWrapper.orderByDesc(sortField);
        } else {
            queryWrapper.orderByAsc(sortField);
        }
        return userMapper.selectPage(page, queryWrapper);
    }
}