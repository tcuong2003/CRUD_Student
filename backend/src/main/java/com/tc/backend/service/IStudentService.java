package com.tc.backend.service;

import com.tc.backend.entity.Student;

import java.util.List;

public interface IStudentService {
    List<Student> getAllStudents();
    Student saveStudent(Student student);
    Student updateStudent(Student student, Long id);
    Student getStudentById(Long id);
    void deleteStudent(Long id);

}
