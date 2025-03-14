package com.daisyPig.exception;

import com.daisyPig.common.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public Response<String> handleException(Exception e) {
        // 记录日志
        log.error("接口调用出现异常", e);
        return Response.error("系统出现异常，请稍后再试");
    }
}