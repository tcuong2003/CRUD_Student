package com.tc.backend.service;

import com.tc.backend.entity.Student;
import com.tc.backend.exception.BadRequest400;
import com.tc.backend.exception.InternalServerError500;
import com.tc.backend.exception.NotFound404;
import com.tc.backend.repository.IStudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor // sử dụng để tự động tạo ra một constructor có tham số cho tất cả các trường dữ liệu final hay @NonNull.
public class StudentService implements IStudentService{

    private final IStudentRepository iStudentRepository; //giá trị không thể thay đổi
    @Override
    public List<Student> getAllStudents() {
        List<Student> students = iStudentRepository.findAll(); //trả về list danh sách
        if (!students.isEmpty()) { //isEmpty: có rỗng không?
            return students;
        } else {
           throw new NotFound404("Not Found Student!"); //lớp lỗi 404
        }
    }

    @Override
    public Student saveStudent(Student student) {
        if (student.getFirstName().contains(" ")){ //kiểm tra có chứa khoảng trắng không?
            throw new BadRequest400("First Name does not contain whitespace!");
        }
        if (student.getFirstName().matches(".*\\d.*")){ // .* tất cả các kí tự phía trước va sau, \\d là kí tự số => kiểm tra trong chuỗi nhập có kí tự số không
            throw new BadRequest400("First Name does not contain number");
        }
        if (student.getLastName().contains(" ")){
            throw new BadRequest400("Last Name does not contain whitespace!");
        }
        if (student.getLastName().matches(".*\\d.*")){
            throw new BadRequest400("Last Name does not contain number!");
        }
        if (student.getAge()<=10 ||student.getAge()>=100)
        {
            throw new BadRequest400("Age must be between 10 and 100");
        }
        if (student.getPhoneNumber().length() != 10 || !student.getPhoneNumber().matches("\\d+")) {
            throw new BadRequest400("The phone number must have 10 digits and only contain numeric characters");
        }
        return iStudentRepository.save(student);
    }

    @Override
    public Student updateStudent(Student student, Long id) {
        Optional<Student> studentOptional = iStudentRepository.findById(id); //Optional trả về Object hoặc trả về null (không tồn tại), tránh gây ra lỗi NullPointerException
        if (studentOptional.isPresent()) { // isPresent kiểm tra có tồn tại không? nên sử dụng .get() để lấy dữ liệu ra
            if (student.getFirstName().contains(" ")) {
                throw new BadRequest400("First Name does not contain whitespace!");
            }
            if (student.getFirstName().matches(".*\\d.*")) {
                throw new BadRequest400("First Name does not contain number!");
            }
            if (student.getLastName().contains(" ")) {
                throw new BadRequest400("Last Name does not contain whitespace!");
            }
            if (student.getLastName().matches(".*\\d.*")) {
                throw new BadRequest400("Last Name does not contain number!");
            }
            if (student.getAge() <= 10 || student.getAge() >= 100) {
                throw new BadRequest400("Age must be between 10 and 100");
            }
            if (student.getPhoneNumber().length() != 10 || !student.getPhoneNumber().matches("\\d+")) {
                throw new BadRequest400("The phone number must have 10 digits and only contain numeric characters");
            }
//            if (iStudentRepository.findByEmail(student.getEmail()).isPresent()) {
//                throw new BadRequest400("Email already exists");
//            }
            if (!student.getEmail().matches("^[a-zA-Z0-9]+(\\.[a-zA-Z0-9]+)*@gmail\\.com$")) {
                // ^ : Bắt đầu của chuỗi, [a-zA-Z0-9]+ : Một hoặc nhiều ký tự chữ cái hoặc số, (\\.[a-zA-Z0-9]+)* : Nhóm ký tự có thể lặp lại 0 hoặc nhiều lần, bắt đầu bằng dấu chấm, (.) theo sau là một hoặc nhiều ký tự chữ cái hoặc số.
                // @gmail\\.com : Địa chỉ email kết thúc bằng "@gmail.com", $ : Kết thúc của chuỗi
                throw new BadRequest400("Incorrect email format entered");
            }
            iStudentRepository.findById(id).map(st -> { //findById(id) trả về kiểu Optional, map là thực hiện biến đổi trên giá trị và trả về một Optional mới chứa kết quả biến đổi, không thay đổi giá trị trong Optional
                st.setFirstName(student.getFirstName());
                st.setLastName(student.getLastName());
                st.setEmail(student.getEmail());
                st.setAge(student.getAge());
                st.setPhoneNumber(student.getPhoneNumber());
                st.setDepartment(student.getDepartment());
                return iStudentRepository.save(st);

            });
        }
        else {
            throw new NotFound404("Not Found Id Student");
        }
        return student;
    }

    @Override
    public Student getStudentById(Long id) {
        return iStudentRepository.findById(id).orElseThrow(()->new NotFound404("Not Found Id Student"));
    }

    @Override
    public void deleteStudent(Long id) {
        if (!iStudentRepository.existsById(id)){ //existsById có tồn tại không
            throw new NotFound404("Not Found Id Student");
        }
        iStudentRepository.deleteById(id);
    }
}
