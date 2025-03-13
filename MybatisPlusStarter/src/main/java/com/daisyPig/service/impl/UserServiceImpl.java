package com.daisyPig.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.daisyPig.entity.User;
import com.daisyPig.mapper.UserMapper;
import com.daisyPig.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
}