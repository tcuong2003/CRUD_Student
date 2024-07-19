package com.tc.backend.controller;

import com.tc.backend.entity.Student;
import com.tc.backend.service.IStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("http://localhost:3000") //chỉ định rằng các request từ domain http://localhost:3000 được phép truy cập tài nguyên được chú thích bằng annotation
@RestController //trả về 1 JSON hay  HTTP Response body mà không cần thông qua view resolver.
@RequiredArgsConstructor
@RequestMapping("/students") //sử dụng để ánh xạ các request HTTP tới một URI cụ thể tới một phương thức xử lý trong một controller.

public class StudentController {
    private final IStudentService iStudentService;

    @GetMapping("/getall")
    //ResponseEntity là một HTTP Response cho phép bạn tùy chỉnh nội dung, headers và status code của response một cách linh hoạt.
    public ResponseEntity<List<Student>> getAllStudents() { //trả về List Object Student
        return new ResponseEntity<>(iStudentService.getAllStudents(), HttpStatus.FOUND); //trạng thái response
    }
    @PostMapping("/save")
    //RequestBody là tham số của một phương thức controller sẽ được lấy từ phần body của một HTTP Request. (Object)
    public Student saveStudent(@RequestBody Student student) {
        return iStudentService.saveStudent(student);
    }

    @PutMapping("/update/{id}")
    public Student updateStudent(@RequestBody Student student, @PathVariable Long id) {
        return iStudentService.updateStudent(student, id);
    }

    @GetMapping("/get/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return iStudentService.getStudentById(id);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteStudent(@PathVariable Long id) {
        iStudentService.deleteStudent(id);
    }
}
