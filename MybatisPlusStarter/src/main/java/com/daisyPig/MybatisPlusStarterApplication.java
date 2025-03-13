package com.daisyPig;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.mybatis.spring.annotation.MapperScan;

@SpringBootApplication
@MapperScan("com.daisyPig.mapper")
public class MybatisPlusStarterApplication {
    public static void main(String[] args) {
        SpringApplication.run(MybatisPlusStarterApplication.class, args);
    }
}