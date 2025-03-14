package com.daisypig;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.daisyPig.entity.User;
import com.daisyPig.service.UserService;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;

@SpringBootTest
public class UserMapperTest {
    @Resource
    private UserService userService;

    @Test
    public void testUpdateUser() {
        // 创建用户对象
        User user = new User();
        user.setId(14L);
        user.setName("John Doe222");
        user.setAge(22);
        // 更新用户信息
        boolean result = userService.updateUser(user);
        System.out.println("更新结果：" + result);
    }

    @Test
    public void testAddUser() {
        // 创建用户对象
        User user = new User();
        user.setName("John Doe");
        user.setAge(30);
        // 更新用户信息
        boolean result = userService.save(user);
        System.out.println("新增结果：" + result);
    }


        @Test
        public void testAddUserBatch() {
            for (int i = 0; i < 60; i++) {
                // 创建用户对象
                User user = new User();
                user.setName("John Doe"+i);
                user.setAge(i+1);
                // 更新用户信息
               userService.save(user);

            }
        }
        @Test
        public void testDeleteUser () {
            // 创建用户对象
            User user = new User();
            user.setId(13L);
            // 更新用户信息
            boolean result = userService.removeById(user);
            System.out.println("删除结果：" + result);
        }
        @Test
        public void testBatchDeleteUser () {
            boolean deleteUser = userService.batchDeleteUser(Arrays.asList(10L, 11L));
            System.out.println("删除结果：" + deleteUser);

        }
        @Test
        public void testPage () {
            Page<User> page = userService.page(1, 5, "John", null, null, null);
            System.out.println("分页结果：" + page);
        }
        @Test
        public void testCountUser () {
            long count = userService.countUser();
            System.out.println("查询结果：" + count);
        }

    }
