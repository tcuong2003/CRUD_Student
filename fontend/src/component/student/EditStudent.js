import React, { useEffect, useState } from 'react';
import axios from 'axios'; //thư viện HTTP client thực hiện CRUD
import {Link, useNavigate, useParams} from 'react-router-dom'

const EditStudent = () => {
    let navigate = useNavigate();
  
    const {id} = useParams();

    const[student, setStudent] = useState({
      firstName:'',
      lastName:'',
      email: '',
      age: '',
      phoneNumber: '',
      department: ''
    });
  
    const{firstName, lastName, email, age, phoneNumber, department} = student;
  

    useEffect(() => { //useEffect trong đoạn mã của bạn được sử dụng để gọi hàm loadStudents mỗi khi component được render, và chỉ gọi một lần duy nhất khi component được render lần đầu tiên.
        loadStudents();
      }, []); //[] nghĩa là bạn muốn hành động được thực hiện chỉ một lần sau khi component được render lần đầu tiên và không có phụ thuộc nào vào các giá trị state hoặc props.
    
    
      const loadStudents = async () => { //hàm loadStudents thực hiện các thao tác bất đồng bộ do async và trả về 1 promise
        //promise có thể ở trong một trong ba trạng thái: được giải quyết (resolved) nếu hoàn thành thành công, bị từ chối (rejected) nếu xảy ra lỗi, hoặc đang chờ (pending) nếu chưa hoàn thành.
            const result = await axios.get( //sử dụng axios gửi yêu cầu get đến backend, từ khóa await để đợi cho promise được giải quyết hoặc bị từ chối.
                `http://localhost:9091/students/get/${id}`);//302 Mã trạng thái này cung cấp thông tin về liệu yêu cầu đã được xử lý thành công, gặp lỗi, hoặc cần thực hiện thêm hành động nào đó.
                setStudent(result.data);
        };

    const handleInputChange = (e) => {
      setStudent({...student, [e.target.name] : e.target.value});
    };
  
    const updateStudent = async (e) => {
      e.preventDefault(); 
      await axios.put(`http://localhost:9091/students/update/${id}`, student);
      navigate("/view-students");
    };
  
    return (
      <div className='col-sm-8 py-2 px-5 offset-2 shadow'>
        <h2 className='mt-5'> Edit Student</h2>
        <form onSubmit={(e) => updateStudent(e)}>
          <div className='input-group mb-5'>
              <label className='input-group-text' htmlFor='firstName'>First Name</label>
              <input className='form-control col-sm-6' type='text' name='firstName' id='firstName' required value={firstName} onChange={(e) => handleInputChange(e)}/>
          </div>
  
          <div className='input-group mb-5'>
              <label className='input-group-text' htmlFor='lastName'>Last Name</label>
              <input className='form-control col-sm-6' type='text' name='lastName' id='lastName' required value={lastName} onChange={(e) => handleInputChange(e)}/>
          </div>
  
          <div className='input-group mb-5'>
              <label className='input-group-text' htmlFor='email'>Email</label>
              <input className='form-control col-sm-6' type='email' name='email' id='email' required value={email} onChange={(e) => handleInputChange(e)}/>
          </div>
  
          <div className='input-group mb-5'>
              <label className='input-group-text' htmlFor='age'>Age</label>
              <input className='form-control col-sm-6' type='byte' name='age' id='age' required value={age} onChange={(e) => handleInputChange(e)}/>
          </div>
  
          <div className='input-group mb-5'>
              <label className='input-group-text' htmlFor='phoneNumber'>Phone Number</label>
              <input className='form-control col-sm-6' type='text' name='phoneNumber' id='phoneNumber' required value={phoneNumber} onChange={(e) => handleInputChange(e)}/>
          </div>
  
          <div className='input-group mb-5'>
              <label className='input-group-text' htmlFor='department'>Department</label>
              <input className='form-control col-sm-6' type='text' name='department' id='department' required value={department} onChange={(e) => handleInputChange(e)}/>
          </div>
  
          <div className="row mb-5">
                      <div className="col-sm-2">
                          <button
                              type="submit"
                              className="btn btn-outline-success btn-lg">
                              Save
                          </button>
                      </div>
  
                      <div className="col-sm-2">
                          <Link
                              to={"/view-students"}
                              type="submit"
                              className="btn btn-outline-warning btn-lg">
                              Cancel
                          </Link>
                      </div>
                  </div>
  
        </form>
      </div>
    )
}

export default EditStudent
