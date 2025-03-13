package com.daisyPig.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

@Data
@TableName("user")
public class User {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String name;
    @TableField("age")
    private Integer age;
    @TableLogic
    private Integer deleted;
    @Version
    private Integer version;
}