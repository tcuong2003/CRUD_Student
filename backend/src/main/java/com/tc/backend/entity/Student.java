package com.tc.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    @Id //id là khoá chính
    @GeneratedValue(strategy = GenerationType.IDENTITY) //giá trị của các trường id tự động tăng
    private Long id;
    private String firstName;
    private String lastName;


    @NaturalId(mutable = true) //NaturalId giá trị duy nhất, mutable có thể thay đổi giá trị mà không cần xoá hay tạo đối tượng
    @Column(name = "email", unique = true) //trường email ánh xạ với cột có tên là , unique là phải duy nhất, không được trùng lặp
    private String email;
    private byte age;

    @NaturalId(mutable = true)
    @Column(name = "phonenumber", unique = true)
    private String phoneNumber;
    private String department;
}
