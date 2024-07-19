package com.tc.backend.repository;

import com.tc.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface IStudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByEmail(String email);
}
