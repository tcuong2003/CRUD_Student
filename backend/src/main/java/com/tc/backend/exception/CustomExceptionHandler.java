package com.tc.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice //xử lý các exception (ngoại lệ) một cách toàn cục cho tất cả các controller trong ứng dụng RESTful.
public class CustomExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST) //đặt HTTP status code cho response khi exception được xử lý
    //Khi một đối tượng không hợp lệ được truyền vào một phương thức được đánh dấu bằng @Valid hoặc @Validated,
    // Spring sẽ thực hiện kiểm tra validation trước khi phương thức được gọi. Nếu đối tượng không hợp lệ, Spring sẽ ném một MethodArgumentNotValidException.
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleException(MethodArgumentNotValidException ex){
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult()//lấy thông tin lỗi về validation
                .getFieldErrors() //lấy file bị lỗi
                .forEach(error -> errors.put(error.getField(), error.getDefaultMessage())); //truyền các file và thông tin lỗi vào map dưới dạng key value
        return errors;
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFound404.class)
    public Map<String, String> userNotFound(NotFound404 ex){
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());
        return error;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadRequest400.class)
    public Map<String, String> userNotFound(BadRequest400 ex){
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());
        return error;
    }
}
